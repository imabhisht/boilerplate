const { firebaseAdmin } = require("../auth")
const { AuthFunctions } = require("../functions");

const auth = new AuthFunctions();

module.exports.loginUser = async (req, res, next) => {
    try {
        const { email_id, stage } = req.body;


        const user = await auth.isUserExists(email_id);

        if (!user) {
            if (stage === "request-otp") {
                const sessionId = await auth.generateUserSession(email_id);
                return res.status(200).send({
                    session_id: sessionId,
                    message: "OTP sent"
                });
            }
            if (stage === "verify-otp") {
                const { session_id, code } = req.body;
                const session = await auth.verifyUserSession(session_id, code);
                const user = await auth.createUser(session.email_id);
                return res.status(200).send({
                    message: "User created successfully",
                    user
                });
            }
        } else {

            if (stage === "request-otp") {
                const sessionId = await auth.generateUserSession(email_id);
                return res.status(200).send({
                    session_id: sessionId,
                    message: "OTP sent"
                });
            }
            if (stage === "verify-otp") {
                const { sessionId, code } = req.body;
                const session = await auth.verifyUserSession(sessionId, code);
                const token = await auth.generateLoginToken(session.email_id);
                return res.status(200).send({
                    message: "User logged in successfully",
                    token
                });
            }
        }



    } catch (error) {
    next(error);
    }
}