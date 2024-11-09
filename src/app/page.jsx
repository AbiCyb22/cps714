//aka the App: the renderer
import Link from 'next/link';

const Home = () => {
  return (
    <section className='section'>
      <h1>
        Welcome back to the Dashboard
      </h1> 
      <h2>
        Click on the items below begin Managing!
      </h2>
      <section className="card"> 
      <ul className="card__list">
        <Link href="/user" passHref className="card__element">
          <h3>
            Manage & Edit User Profiles
          </h3>
           <strong>lol heyo </strong>
        </Link>
        <Link href="/content" passHref className="card__element">
          <h3>
            Manage Content
          </h3>
        </Link>
        <Link href="/feedback" passHref className="card__element">
          <h3>Manage Feedback</h3>
        </Link>
        <Link href="/rewards" passHref className="card__element">
          <h3>Manage Rewards</h3>
        </Link>
        <Link href="/tickets" passHref className="card__element">
          <h3>Manage Tickets</h3>
        </Link>
        
      </ul>
    </section>
    </section>
    
  );
};

export default Home;
