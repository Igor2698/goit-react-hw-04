export const ErrorMessage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <img
        width="30%"
        height="50%"
        src="https://i.pinimg.com/736x/25/0c/d5/250cd5d108ec7d09bc92be68310cf0f2.jpg"
        alt="Error picture"
      />
      <p>Something went wrong. Please reload the page</p>
    </div>
  );
};
