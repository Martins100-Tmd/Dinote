type IconType = { Itext: string; styling: string };

const IconComponent = ({ Itext, styling }: IconType) => {
   return <i className={`${styling} material-icons`}>{Itext}</i>;
};

export default IconComponent;
