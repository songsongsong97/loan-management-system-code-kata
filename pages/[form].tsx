import Sidebar from "@/components/Sidebar";
import Dashboard from "@/components/Dashboard";

const FormView = () => {
  return (
    <div className="flex flex-row min-h-screen h-max items-stretch">
      <Sidebar />
      <Dashboard label="Create New Application" showBackArrow showForm />
    </div>
  );
};

export default FormView;
