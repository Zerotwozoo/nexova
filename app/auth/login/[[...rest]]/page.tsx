import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-background to-muted/50">
      <SignIn
        fallbackRedirectUrl="/dashboard"
        signUpUrl="/auth/register"
        appearance={{
          elements: {
            rootBox: "mx-auto w-full max-w-md",
            card: "shadow-xl border-0 rounded-2xl",
            headerTitle: "text-2xl font-bold",
            headerSubtitle: "text-muted-foreground",
            socialButtonsBlockButton: "rounded-xl border border-input hover:bg-accent",
            dividerLine: "bg-border",
            dividerText: "text-muted-foreground",
            formFieldLabel: "text-sm font-medium",
            formFieldInput: "rounded-xl border border-input",
            formButtonPrimary: "rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
            footerActionLink: "text-foreground font-medium hover:underline",
          },
        }}
      />
    </div>
  );
}
