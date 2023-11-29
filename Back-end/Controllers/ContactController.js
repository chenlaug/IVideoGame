const User = require('../Models/User');
const transporter = require('../Configs/nodemailerConfig');

exports.sendMessage = async (req, res) => {
    const message = req.body.message;
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const info = await transporter.sendMail({
            from: '"IVIDEOGAME" <your_email@gmail.com>',
            to: process.env.EMAIL_USER,
            subject: 'Message',
            text: `De: ${user.firstName} ${user.lastName}\nEmail: ${user.email}\n\n${message}`,
            html: `<b>De: ${user.firstName} ${user.lastName}<br>Email: ${user.email}<br><br>${message}</b>`,
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ message: error });
    }
};
