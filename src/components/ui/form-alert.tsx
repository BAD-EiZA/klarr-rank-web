import { cn } from "@/lib/utils";

export function FormAlert({
  children,
  tone = "error",
  className,
}: {
  children: React.ReactNode;
  tone?: "error" | "success" | "info";
  className?: string;
}) {
  if (!children) return null;

  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn(
        "text-sm leading-relaxed",
        tone === "error" && "text-critical",
        tone === "success" && "text-success",
        tone === "info" && "text-text-secondary",
        className,
      )}
    >
      {children}
    </p>
  );
}
