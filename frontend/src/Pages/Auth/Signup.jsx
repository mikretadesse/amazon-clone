import React from "react";
import styles from "./Auth.module.css";

function Auth() {
  return (
    <div className={styles.page}>
      <div className={styles.logoWrapper}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="Amazon"
          className={styles.logo}
        />
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>Sign in</h1>

        <label className={styles.label}>Email or mobile phone number</label>
        <input type="text" className={styles.input} />

        <button className={styles.continueBtn}>Continue</button>

        <p className={styles.terms}>
          By continuing, you agree to Amazon's
          <span> Conditions of Use</span> and <span>Privacy Notice</span>.
        </p>

        <details className={styles.help}>
          <summary>Need help?</summary>
          <ul>
            <li>Forgot your password</li>
            <li>Other issues with Sign-In</li>
          </ul>
        </details>
      </div>

      <div className={styles.newAccount}>
        <div className={styles.divider}>
          <span>New to Amazon?</span>
        </div>
        <button className={styles.createBtn}>Create your Amazon account</button>
      </div>

      <footer className={styles.footer}>
        <div>
          <span>Conditions of Use</span>
          <span>Privacy Notice</span>
          <span>Help</span>
        </div>
        <p>© 1996–2025, Amazon.com, Inc. or its affiliates</p>
      </footer>
    </div>
  );
}
export default Auth;