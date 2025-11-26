export default function ForgotPasswordPage() {

    return (
        <div className="min-h-screen bg-linear-to-br from-accent/30 via-blush/50 to-rose/30 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Background decorative elements for depth */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-rose/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blush/30 rounded-full blur-3xl"></div>
            </div>
            <div className="relative mt-8 mb-8 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full p-8 animate-fade-in border border-white/20">
                <div className="text-center mb-8">
                    <h1 className="font-headline text-3xl font-semibold text-text mb-2">
                        Anbu Gynaecare
                    </h1>
                    <h2 className="font-headline text-xl font-semibold text-text mb-4">
                        Reset Your Password 🔐
                    </h2>
                    <p className="font-body text-sm text-muted">
                        Enter your email address and we&apos;ll send you a link to reset your password.
                    </p>
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
                            className="w-full px-4 py-3 rounded-2xl border border-white/30 bg-white/10 backdrop-blur-sm text-text placeholder-muted/70 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent/50 transition-all duration-300"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent/80 backdrop-blur-sm text-bg font-semibold py-3 px-6 rounded-2xl shadow-lg hover:bg-accent/90 hover:scale-105 hover:shadow-xl transition-all duration-300 border border-white/20"
                    >
                        Reset Password
                    </button>
                </form>
                <div className="text-center mt-6">
                    <a href="/login" className="font-body text-sm text-accent hover:underline">
                        ← Back to Login
                    </a>
                </div>
            </div>
        </div>
    );

}