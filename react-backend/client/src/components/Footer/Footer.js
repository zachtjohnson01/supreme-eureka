import React from "react";
import "./Footer.css";
import {FaGithubSquare} from "react-icons/lib/fa";


const footer = () => (
    <footer className="footer">
      <p>Copyright &copy; 2018 Supreme Eureka
        <a
            href="https://github.com/zachtjohnson01/supreme-eureka"
            target="_blank" rel="noopener noreferrer">
          <FaGithubSquare size={20} className="github-icon"/>
        </a>
      </p>
      <p>Created by:
        <a href="https://github.com/zachtjohnson01" target="_blank"
           rel="noopener noreferrer">ZJ</a>
      </p>
    </footer>
);

export default footer;