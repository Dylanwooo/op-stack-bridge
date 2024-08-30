import * as React from "react";

const MegaETHLogo = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  return (
    <div
      className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center"
      ref={ref}
      {...props}
    >
      <span className="text-white text-xs">M</span>
    </div>
  );
});
MegaETHLogo.displayName = "MegaETHLogo";

export { MegaETHLogo };
