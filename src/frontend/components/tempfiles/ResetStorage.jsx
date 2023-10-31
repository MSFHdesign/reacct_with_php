
function ResetStorage() {
  const handleResetLocalStorage = () => {
    // Nulstil local storage
    localStorage.clear();
  };

  return (
    <div>
      <button onClick={handleResetLocalStorage}>Nulstil Local Storage</button>
    </div>
  );
}

export default ResetStorage;
