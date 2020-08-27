import React from "react";

function Footer() {
  return (
    <footer>
      <hr />
      <p className="pull-right">
        <i className="fab fa-small fa-github" /> Proudly built using React.js
      </p>
      <p>
        <span>
          Photo by{" "}
          <a href="https://unsplash.com/@austriannationallibrary?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Austrian National Library
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/s/photos/library-books?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">
            Unsplash
          </a>
        </span>
      </p>
    </footer>
  );
}

export default Footer;
