export const CustomStepIcon = (props: { icon?: any; active?: any; completed?: any; }) => {
    const { active, completed } = props;
    return (
      <div
        style={{
          width: 35,
          height: 35,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "50%",
          backgroundColor: active ? "#4A90E2" : completed ? "#4A90E2" : "#ccc",
          color: "white",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {completed ? "✔" : props.icon}
      </div>
    );
  };