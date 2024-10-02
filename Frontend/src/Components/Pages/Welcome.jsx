import React from "react";
import '../styles/Welcome.css';
export const Welcome = () => {
    return (
        <>
            <div className="WEL_DIV">
                <p className="WEL_DIV_P">MailBoxHub is a full-stack web application designed to provide a seamless and interactive mailing experience for users. The platform allows users to create personal accounts, securely send and receive emails, and manage their messages effortlessly. With features like starred messages, users can highlight important communications, while the trash functionality helps them keep their inbox organized by easily discarding unnecessary mails. MailBoxHub is designed with user experience in mind, providing intuitive navigation and an easy-to-use interface. Whether sending a quick message, marking an email as important, or organizing the inbox, MailBoxHub offers a modern mailing solution tailored to the needs of today's users. The combination of a strong tech stack and thoughtful design makes MailBoxHub a reliable, secure, and user-friendly platform for all your communication needs.<br/><br/>The application is built using a powerful tech stack, including React.js for a dynamic and responsive user interface, Axios for efficient API calls, and React Redux combined with Redux Thunk for state management, ensuring smooth and scalable interactions throughout the app. On the backend, MailBoxHub utilizes Node.js and Express.js to handle server operations, providing a robust and scalable environment for processing user requests. Security is a top priority, with Bcrypt employed to securely hash user passwords, protecting user data from unauthorized access. Mongoose and MongoDB are used to manage the database, ensuring efficient data handling and storage of user accounts and messages. JSON Web Tokens (JWT) are implemented to authenticate and authorize users, enhancing the overall security by managing session control and ensuring only authorized access to sensitive features.</p>
            </div>

        </>
    );
}