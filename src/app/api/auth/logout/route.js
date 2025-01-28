export async function POST(req, res) {
    req.logout();
    res.status(200).json({ message: "Logged out successfully" });
  }
  