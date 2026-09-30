import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <span className="home-hero__eyebrow">YOUR TRIPS. YOUR STORIES.</span>
          <h1 className="home-hero__title">TripTales</h1>
          <p className="home-hero__subtitle">Your trips. Your stories. All in one place.</p>
          <div className="home-hero__features" aria-label="TripTales features">
            <span><b>✈</b>Plan</span>
            <span><b>⌖</b>Explore</span>
            <span><b>▤</b>Journal</span>
            <span><b>▣</b>Capture</span>
            <span><b>⌁</b>Relive</span>
          </div>
          <div className="home-hero__actions">
            <Link className="home-hero__button" to="/create-trip">Start a New Journey <span>→</span></Link>
            <Link className="home-hero__secondary" to="/trips">View My Trips</Link>
          </div>
        </div>
        <div className="home-hero__art" aria-hidden="true">
          <div className="home-hero__photo">
            <img src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=700&q=85" alt="Mountain lake destination" />
          </div>
          <p className="home-hero__note">Collect moments, not things ♡</p>
        </div>
      </section>

      <section className="home-story-section">
        <div className="home-section-heading">
          <span>MAKE ROOM FOR THE GOOD DAYS</span>
          <h2>Your travel story, in its own rhythm.</h2>
          <p>TripTales keeps the planning, the little details and the memories together without turning your journey into a checklist.</p>
        </div>
        <div className="home-story-grid">
          <article className="home-story-card home-story-card--plan">
            <div className="home-story-card__number">01</div>
            <span className="home-story-card__icon">✦</span>
            <h3>Plan lightly</h3>
            <p>Shape a trip around the places and moments you actually want to remember.</p>
            <Link to="/create-trip">Create a trip <span>→</span></Link>
          </article>
          <article className="home-story-card home-story-card--write">
            <div className="home-story-card__number">02</div>
            <span className="home-story-card__icon">✎</span>
            <h3>Write honestly</h3>
            <p>Save the details that never make it into a standard itinerary.</p>
            <Link to="/journal">Open your journal <span>→</span></Link>
          </article>
          <article className="home-story-card home-story-card--keep">
            <div className="home-story-card__number">03</div>
            <span className="home-story-card__icon">◌</span>
            <h3>Keep the feeling</h3>
            <p>Collect photographs and moments in a private place that feels like yours.</p>
            <Link to="/memorygram">View MemoryGram <span>→</span></Link>
          </article>
        </div>
      </section>

      <section className="home-inspiration">
        <div className="home-inspiration__image">
          <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85" alt="A quiet mountain landscape" />
        </div>
        <div className="home-inspiration__copy">
          <span>THE BEST PART IS LOOKING BACK</span>
          <h2>From the first idea to the last photograph.</h2>
          <p>See your journey take shape over time, one plan, note and memory at a time.</p>
          <Link to="/timeline">Explore your timeline <span>→</span></Link>
        </div>
      </section>
    </main>
  );
}

export default Home;