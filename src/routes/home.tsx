import ActionButton from "../components/Forms/ActionButton/ActonButton";

export default function Home() {
  return (
    <div className="narrow-content page-home">
      <h2>Welcome to AtlantisGate</h2>
      <h3>A digital verification platform by RunDMC</h3>
      <p>
        Using biometrics scanning we are able to uniquely identify new visitors such as yourself into our aquatic paradise, and help you get
        integrated into society.
      </p>
      <h3>Begin Integration</h3>
      <p>If user is already logged in...</p>
      <ActionButton to="integration">Begin Integration</ActionButton>
    </div>
  );
}
