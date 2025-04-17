interface ContainerWrapperProps {
  customHeight?: string;
  children: React.ReactNode;
}

export const ContainerWrapper = ({
  children,
  ...props
}: ContainerWrapperProps) => {
  return (
    <div
      className="login-page"
      {...props}
    >
      {/* Fixed Left side */}
      <div className="left-side">
        <div className="container-img"></div>
      </div>
       {/* Variable Right side */}
      <div className="right-side">
        <div className="right-side-container">{children}</div>
      </div>
    </div>
  );
};
