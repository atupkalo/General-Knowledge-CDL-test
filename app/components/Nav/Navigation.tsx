import Link from 'next/link';
import './Nav.css';

export default function Navigation() {
    return (
      <ul className="nav">
        <li className="nav-item">
          <Link href="/">TEST PRACTICE</Link>
        </li>
        <li className="nav-item">
          <Link href="/Pages/En-words">ENGLISH PRACTICE</Link>
        </li>
      </ul>
    );
  }