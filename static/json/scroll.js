document.addEventListener("load", () => {
  const menu_container = document.getElementById("menu-container");
  const dateTypes = menu_container.querySelectorAll(".dateType");
  const middleIndex = Math.floor(dateTypes.length / 2);
  const middleType = dateTypes[middleIndex];

  middleType.scrollIntoView({ block: "center", behavior: "instant" });
});