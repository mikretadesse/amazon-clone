import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

import styles from "./Auth.module.css";
import amazonLogo from "../../assets/logo/amazon-logo2.png";

import { auth } from "../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
} from "firebase/auth";

import { DataContext } from "../../Components/DataProvider/DataProvider";
import { type } from "../Utility/Action.type";

function Auth() {
  const { state, dispatch } = useContext(DataContext);
  const userFromState = state?.user || null;

  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Centralized friendly error messages
  const getFriendlyError = (code) => {
    const firebaseErrors = {
      "auth/user-not-found": "No account found with this email.",
      "auth/wrong-password": "Incorrect Password.",
      "auth/invalid-credential": "Incorrect Credentials.",
      "auth/email-already-in-use": "This email is already registered.",
      "auth/network-request-failed": "Network error. Check your connection.",
      "auth/invalid-email": "Invalid email address.",
      "auth/weak-password": "Password should be at least 6 characters.",
      "auth/too-many-requests": "Too many attempts. Try again later.",
    };
    return firebaseErrors[code] || "An unexpected error occurred.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setLoading(true);

    try {
      let userCredential;

      if (isSignIn) {
        // Sign in existing user
        userCredential = await signInWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );
        setMessage(`Welcome back, ${userCredential.user.email.split("@")[0]}!`);
        // Dispatch and navigate
        dispatch({ type: type.SET_USER, user: userCredential.user });
        navigate("/"); // Redirect after successful login
      } else {
        // Create new account
        userCredential = await createUserWithEmailAndPassword(
          auth,
          email.trim(),
          password
        );

        await sendEmailVerification(userCredential.user);
        setMessage(
          "Account created! Verification email sent. Please check your inbox."
        );

        // Dispatch user but stay on page until verification
        dispatch({ type: type.SET_USER, user: userCredential.user });
      }
    } catch (err) {
      console.error(err);
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError("Please enter your email first.");
      return;
    }

    setError("");
    setMessage("");
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email.trim());
      setMessage("Password reset email sent! Check your inbox.");
    } catch (err) {
      console.error(err);
      setError(getFriendlyError(err.code));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.auth}>
      <Link to="/">
        <div className={styles.logo}>
          <img src={amazonLogo} alt="Amazon Logo" />
        </div>
      </Link>

      <div className={styles.container}>
        <h1 className={styles.title}>
          {isSignIn ? "Sign-in" : "Create Account"}
        </h1>

        {error && <p className={styles.error}>{error}</p>}
        {message && <p className={styles.message}>{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="email">Email or mobile phone number</label>
            <input
              type="email"
              id="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className={styles.field}>
            <div className={styles.password}>
              <label htmlFor="password">Password</label>
              {isSignIn && (
                <button
                  type="button"
                  className={styles.forgotLink}
                  onClick={handleResetPassword}
                  disabled={loading}>
                  Forgot your password?
                </button>
              )}
            </div>
            <input
              type="password"
              id="password"
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className={`${styles.button} ${styles.primaryButton}`}
            disabled={loading}>
            {loading ? (
              <FadeLoader color="#25b09b" height={6} width={2} />
            ) : isSignIn ? (
              "Sign in"
            ) : (
              "Continue"
            )}
          </button>
        </form>

        <div className={styles.agreement}>
          <p>
            By {isSignIn ? "signing-in" : "continuing"} you agree to the Amazon
            Fake Clone Conditions of Use & Sale. Please see our Privacy Notice,
            Cookies Notice and Interest-Based Ads Notice.
          </p>
        </div>

        {isSignIn ? (
          <>
            <div className={styles.divider}>
              <span>New to Amazon?</span>
            </div>
            <button
              onClick={() => setIsSignIn(false)}
              className={`${styles.button} ${styles.secondaryButton}`}>
              Create your Amazon account
            </button>
          </>
        ) : (
          <>
            <div className={styles.divider}>
              <span>Already have an account?</span>
            </div>
            <button
              onClick={() => setIsSignIn(true)}
              className={`${styles.button} ${styles.primaryButton}`}>
              Sign in
            </button>
          </>
        )}
      </div>

      <hr style={{ width: "90%", border: "1.5px solid #D5D9D9" }} />

      <div className={styles.footer}>
        <div className={styles.footerLinks}>
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </div>
        <div className={styles.copyright}>
          © 1996-2025, Amazon.com, Inc. or its affiliates
        </div>
      </div>
    </div>
  );
}

export default Auth;
