
export default function Socials({ socials = [], componentsClass }) {
  return (
    <>
      {socials.map((social, i) => (
        <a
          key={i}
          href={social.url}
          className={componentsClass}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className={social.icon}></i>
        </a>
      ))}
    </>
  );
}
