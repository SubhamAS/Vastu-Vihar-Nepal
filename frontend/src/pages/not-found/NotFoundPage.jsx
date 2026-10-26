import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, House } from "lucide-react";
import "./not-found.css";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const previousTitle = document.title;
    const description = document.querySelector('meta[name="description"]');
    const robots = document.querySelector('meta[name="robots"]');
    const previousDescription = description?.content;
    const previousRobots = robots?.content;

    document.title = "Page not found | Vastu Vihar Nepal";
    if (description) {
      description.content = "This page could not be found. Return to Vastu Vihar Nepal to explore homes and residential communities.";
    }
    if (robots) robots.content = "noindex, follow";

    return () => {
      document.title = previousTitle;
      if (description && previousDescription !== undefined) description.content = previousDescription;
      if (robots && previousRobots !== undefined) robots.content = previousRobots;
    };
  }, []);

  return (
  <main className="not-found" aria-labelledby="not-found-title">
    <div className="not-found__landscape" aria-hidden="true">
      <svg viewBox="0 0 1440 330" preserveAspectRatio="xMidYMax slice">
        <path d="M0 280 180 154l105 75 206-174 201 177 144-111 199 155 153-128 252 155v27H0Z" />
        <path d="m285 229 206-174 76 67-65-18-18 24-28-9-42 39-26-4-31 38-31-2-41 39Z" />
        <path d="m692 232 144-111 79 62-40-13-20 16-22-4-28 22-26-8-23 20-29-1Z" />
        <path d="M0 280c183-43 292-19 435 4s312-25 462-2 370 39 543-6v54H0Z" />
      </svg>
    </div>
    <div className="not-found__content">
      <p className="not-found__eyebrow">Vastu Vihar · Nepal</p>
      <p className="not-found__number" aria-hidden="true">404</p>
      <h1 id="not-found-title">This address has no home.</h1>
      <p className="not-found__message">
        The page you’re looking for may have moved. Let’s take you somewhere familiar.
      </p>
      <Link className="not-found__home" to="/">
        <House size={17} strokeWidth={1.8} aria-hidden="true" />
        Back to home
      </Link>
      <button className="not-found__back" type="button" onClick={() => navigate(-1)}>
        <ArrowLeft size={15} strokeWidth={1.8} aria-hidden="true" />
        Go back to the previous page
      </button>
    </div>
    <p className="not-found__coordinates" aria-hidden="true">27°42′ N&nbsp;&nbsp; 85°19′ E</p>
  </main>
  );
};

export default NotFound;
