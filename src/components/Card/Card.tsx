import "./Card.css";
import RepoInfo from "../../interfaces/repo-info.interface";

/**
 * Display repository information card
 */
export default function Card({ repoInfo }: { repoInfo: RepoInfo }) {
  return (
    <div className="card">
      <div className="card-name">
        <a href={repoInfo.html_url} target="_blank" rel="noreferrer">
          {repoInfo.full_name}
        </a>
      </div>
      <div className="card-description">
        {repoInfo.description || "No description"}
      </div>
      <div className="card-star">
        <img src="/icons8-star-48.png" alt="Star" />
        {repoInfo.stargazers_count}
      </div>
    </div>
  );
}
