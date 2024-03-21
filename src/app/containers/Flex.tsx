interface FlexInterface {
  children: React.ReactNode | React.ReactNode[];
  direction?: "row" | "column";
  gap?: number | null;
  justify?:
    | "center"
    | "space-between"
    | "space-around"
    | "flex-start"
    | "flex-end";
  align?: "center" | "flex-start" | "flex-end" | "normal";
  fullWidth?: boolean;
  fullHeight?: boolean;
  className?: string;
}

export default function Flex({
  children,
  direction = "row",
  gap = null,
  justify = "center",
  align = "center",
  fullWidth = false,
  fullHeight = false,
  className = "",
}: FlexInterface) {
  return (
    <div
      className={className}
      style={{
        display: "flex",
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
        width: fullWidth ? "100%" : "auto",
        height: fullHeight ? "100%" : "auto",
        gap: gap ? `${gap}px` : undefined,
      }}
    >
      {children}
    </div>
  );
}
