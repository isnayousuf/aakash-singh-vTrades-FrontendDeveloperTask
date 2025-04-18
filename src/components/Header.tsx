const Header = ({ headerLabel, subHeading }: { headerLabel: string , subHeading?:string}) => {
  return (
    <div>
      <h1 className="right-side--heading">{headerLabel}</h1>
      <p className="right-side--sub-heading">
        {subHeading ?  subHeading : 'Manage your workspace seamlessly. {headerLabel} to continue.'}
        
      </p>
    </div>
  );
};

export default Header;
