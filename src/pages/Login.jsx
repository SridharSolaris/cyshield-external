import React from 'react'

const Login = () => {
    return (
        <div className="max-w-md mx-auto mt-16 p-6 bg-white shadow-lg rounded">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Login</h2>
            <form>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="email">Email</label>
                    <input type="email" id="email" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your email" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-1" htmlFor="password">Password</label>
                    <input type="password" id="password" className="w-full p-2 border border-gray-300 rounded" placeholder="Enter your password" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
                    Login
                </button>
            </form>
        </div>
    );
}


export default Login