//aka the App: the renderer
import Link from 'next/link';
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'


const Home = () => {
  return (
    <section>
      <h1>
        Welcome back to the Dashboard
      </h1> 
      <h2>
        Click on the items below begin managing!
      </h2>
      <section className="card"> 
      <ul className="card__list">
        <Link href="/user" passHref className="card__element">
          <h3>
            Manage & Edit User Profiles
          </h3>
          Create or delete accounts, view and edit user profiles, and reset passwords.
        </Link>
        <Link href="/content" passHref className="card__element">
          <h3>
            Manage Content
          </h3>
          Plan content releases, upload and modify instructional materials, and oversee event registrations.
        </Link>
        <Link href="/feedback" passHref className="card__element">
          <h3>Manage Feedback</h3>
          Examine, classify, and evaluate user feedback.
        </Link>
        <Link href="/rewards" passHref className="card__element">
          <h3>Manage Rewards</h3>
          Track user involvement in the loyalty program, authorize redemptions, and keep an eye on reward points.
        </Link>
        <Link href="/tickets" passHref className="card__element">
          <h3>Manage Tickets</h3>
          All support tickets can be viewed, assigned to other admins, and flagged as completed by administrators
        </Link>
        
      </ul>
    </section>
    </section>
    
  );
};

export default Home;
