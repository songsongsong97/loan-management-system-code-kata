import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Table from "./Table";
import Form from "./Form";
import Button from "./Button";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

interface DashboardProps {
  showBackArrow?: boolean;
  label: string;
  showForm?: boolean;
}

export interface ApplicationsProps {
  id: string;
  company: string;
  yearEstablished: number;
  profitOrLoss: number;
  loanAmount: number;
  status: string;
  applicationProvider: string;
  createdAt: Date;
}
const Dashboard: React.FC<DashboardProps> = ({
  showBackArrow,
  label,
  showForm,
}) => {
  const [data, setData] = useState([]);
  const [tbodyContent, setTbodyContent] = useState(<tbody></tbody>);
  const [isLoading, setIsLoading] = useState(false);
  const HEADERS = [
    "Company",
    "Year Established",
    "Accounting Provider",
    "Profit of Last 12 Months",
    "Loan Amount",
    "Created At",
    "Status",
    "Action",
  ];
  const router = useRouter();
  const handleBack = useCallback(() => {
    router.back();
  }, [router]);
  const onClick = useCallback(
    (event: any) => {
      event.stopPropagation();
      const url = "/form";
      router.push(url);
    },
    [router]
  );
  const handleDelete = async (id: string) => {
    try {
      setIsLoading(true);
      // const url = `/api/applications/${id}`;
      const url = `http://localhost:5000/applications/${id}`;
      await axios.delete(url);
      toast.success("Successfully deleted application");
      getData();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const getData = useCallback(async () => {
    setIsLoading(true);
    const url = "http://localhost:5000/applications";
    await axios
      .get(url, {
        headers: {
          "Acess-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "Content-Type",
        },
      })
      .then((response) => {
        const data = response?.data;
        setTbodyContent(
          <tbody>
            {data &&
              data.length !== 0 &&
              data.map((d: ApplicationsProps) => (
                <tr key={d.id} className="p-1">
                  <td className="p-1 border-2">{d.company}</td>
                  <td className="p-1 border-2">
                    {new Date(d.yearEstablished).getFullYear()}
                  </td>
                  <td className="p-1 border-2">{d.applicationProvider}</td>
                  <td className="p-1 border-2">SGD {d.profitOrLoss}</td>
                  <td className="p-1 border-2">SGD {d.loanAmount}</td>
                  <td className="p-1 border-2">
                    {new Date(d.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-1 border-2">{d.status}</td>
                  <td className="p-1 border-2">
                    <RiDeleteBin6Fill
                      className="cursor-pointer text-center text-red-500 text-lg hover:text-red-700"
                      onClick={() => handleDelete(d.id)}
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        );
        setData(data);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div className="flex flex-col p-7 w-screen justify-start">
      <div className="flex flex-row items-center gap-2">
        {showBackArrow && (
          <BiArrowBack
            onClick={handleBack}
            size={20}
            className="cursor-pointer hover:opacity-70 transition"
          />
        )}
        <h1 className="text-xl font-semibold">{label}</h1>
      </div>
      {!showForm && (
        <>
          <Button label="Create" onClick={onClick} />
          {isLoading ? (
            <div className="flex justify-center items-center">
              <ClipLoader color="gray" size={50} />
            </div>
          ) : (
            <Table
              headers={HEADERS}
              hasBody={data && data.length !== 0}
              body={tbodyContent}
            />
          )}
        </>
      )}

      {showForm && <Form />}
    </div>
  );
};

export default Dashboard;
