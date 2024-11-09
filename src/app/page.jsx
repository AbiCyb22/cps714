//aka the App: the renderer

const Home = () => {
  return (
    <section className="w-full flex top flex-col">
      <h1>
        Welcome back to the Dashboard
      </h1> 
      <section className="card"> 
      <ul className="card__list">
        <li className="card__element">
          <h3>
            Manage & Edit User Profiles
          </h3>
           <strong>lol heyo </strong>
        </li>
        <li className="card__element">
          <h3>
            Manage Content
          </h3>
        </li>
        <li className="card__element">
          <h3>Manage Feedback</h3>
        </li>
        <li className="card__element">
          <h3>Manage Reward</h3>
        </li>
        <li className="card__element">
          <h3>Manage Tickets</h3>
        </li>
        
      </ul>
    </section>
    </section>
    
  )
}

export default Home;
