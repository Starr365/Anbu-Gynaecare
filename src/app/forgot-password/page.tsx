export default function ForgotPasswordPage() { 

    return <div className="min-h-screen bg-linear-to-br from-accent/20 to-blush flex items-center justify-center px-4">
                <div className="mt-8 mb-8 bg-bg rounded-2xl shadow-soft max-w-md w-full p-8 animate-fade-in">
                    <div className="text-center mb-8">
                    <h1 className="font-headline text-3xl font-semibold text-text mb-2">
                        Anbu Gynaecare
                    </h1>
                    <h2 className="font-headline text-xl font-semibold text-text mb-4">
                        Reset Your Password
                    </h2>
                    </div>
                    {/* Forgot Password Form */}
                    <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block font-body text-sm font-medium text-muted mb-2">
                        Email
                        </label>                        
                        <input
                        type="email"
                        id="email"
                        name="email"                        
                        placeholder="Enter your email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent text-bg font-semibold py-3 px-6 rounded-2xl shadow-soft hover:scale-105 transition-transform duration-300"
                    >
                        Reset Password
                    </button>
                    </form>
                </div>
           </div>;

}       