import { connectToDatabase } from "../../../../../lib/db";
import User from "../../../../../models/User";

export async function POST(req) {
  await connectToDatabase();

  const { email, password } = await req.json();
  console.log("Received data:", { email, password });

  try {
    const existingUser = await User.findOne({ email });
    console.log("Existing user:", existingUser);
    
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    const user = new User({ email: email, password });
    console.log("User to be saved:", user);
    
    await user.save();
    
    return new Response(JSON.stringify({ message: "User created successfully" }), {
      status: 201,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return new Response(JSON.stringify({ message: "Error creating user" }), {
      status: 500,
    });
  }
}
