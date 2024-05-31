import './style.scss';

function Button({ text }: { text: string }) {
  return <button type="button">{text} </button>;
}

export default Button;
