export default function Signup() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

            <form action="" className="space-y-4">
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">First Name</label>
                    <input type="text" name="firstname" id="firstname" required className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 " />
                </div>
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Last Name</label>
                    <input type="text" name="lasttname" id="lastname" required className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 " />
                </div>
                <div>
                    <label htmlFor="" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" required className="mt-1 block w-full rounded-md px-3 py-2 border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-50 " />
                </div>
            </form>
        </div>
    )
}