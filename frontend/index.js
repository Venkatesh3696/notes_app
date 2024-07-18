const router = async () => {
  const routes = [
    { path: "/", view: () => console.log("viewing dashboard!") },
    { path: "/about", view: () => console.log("viewing about page!") },
    { path: "/contact", view: () => console.log("viewing contact page!") },
  ];
  const potentialMatches = routes.map((route) => {
    return {
      route,
      isMatch: location.pathname === route.path,
    };
  });

  const match = potentialMatches.find((match) => match.isMatch);
  if (match) {
    match.route.view();
  }
  console.log(match);
};

document.addEventListener("DOMContentLoaded", () => {
  router();
});

document.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    router();
  }
});

window.addEventListener("popstate", () => {
  router();
});
