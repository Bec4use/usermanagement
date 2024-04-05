
const LandingPage = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
            <div className="max-w-3xl mx-4 sm:mx-0 border p-10 rounded-lg border-gray-600">
                <h1 className="text-4xl font-bold text-center mb-4">Welcome to User Management System</h1>
                <p className="text-gray-400 leading-relaxed">
                    The User Management System is a comprehensive tool designed to centralize the management of users within an organization. It provides an intuitive interface for administrators to add, update, delete, and search for users based on their first name or last name. The system is built with a React frontend and a Node.js backend, leveraging the Prisma ORM for efficient database operations. This project aims to streamline user management tasks, improve data accuracy, and enhance security by providing a single source of truth for user data.
                </p>
                <div className="flex justify-center mt-8">
                    <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Get Started
                    </a>
                </div>
            </div>
        </div>
    )
}

export default LandingPage