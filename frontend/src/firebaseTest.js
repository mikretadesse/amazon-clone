import { auth } from "./firebase.js"; // path to firebase.js
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const testEmail = "test@example.com"; // Replace with a real test email
const testPassword = "123456"; // Replace with a simple test password

async function testFirebaseAuth() {
  try {
    // Try signing up firstnode firebaseTest.js
    const signUpResult = await createUserWithEmailAndPassword(
      auth,
      testEmail,
      testPassword
    );
    console.log("Sign-up successful:", signUpResult.user);

    // Then sign in
    const signInResult = await signInWithEmailAndPassword(
      auth,
      testEmail,
      testPassword
    );
    console.log("Sign-in successful:", signInResult.user);
  } catch (error) {
    console.error("Firebase Auth Test Error:", error.code, error.message);
  }
}

testFirebaseAuth();
