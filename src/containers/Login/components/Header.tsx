const Header = ({ headerLabel }: { headerLabel: string }) => {
  return (
    <div>
      <h1 className="right-side--heading">{headerLabel}</h1>
      <p className="right-side--sub-heading">
        Manage your workspace seamlessly. {headerLabel} to continue.
      </p>
    </div>
  );
};

export default Header;
