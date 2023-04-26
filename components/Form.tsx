import Button from "./Button";
import Input from "./Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";
import Table from "./Table";

interface TableBodyProps {
  year?: number;
  month?: number;
  profitOrLoss?: number;
  assetsValue?: number;
}
const Form = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [provider, setProvider] = useState("Xero");
  const [amount, setAmount] = useState("0");
  const [year, setYear] = useState("");
  const [company, setCompany] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [tableContent, setTableContent] = useState([]);
  const [tableFooter, setTableFooter] = useState({
    totalProfitOrLoss: 0,
    totalAssetsValue: 0,
  });
  const [preAssessment, setPreAssessment] = useState(20);
  const [profitOrLoss, setProfitOrLoss] = useState(0);

  const HEADER = ["Month", "Profit Or Loss (SGD)", "Assets Value (SGD)"];
  const onFetch = useCallback(async () => {
    setIsLoading(true);
    // const url = `/api/balance_sheet?provider=${provider}&company=${company}&amount=${amount}`;
    const url = `http://localhost:5000/balance_sheet?provider=${provider}&company=${company}&amount=${amount}`;
    await axios
      .get(url)
      .then((response) => {
        const resp = response?.data;
        // setTableContent(resp?.data);
        setTableContent(resp?.data?.data);
        setTableFooter({
          totalAssetsValue: resp?.totalAssetsValue,
          totalProfitOrLoss: resp?.totalProfitOrLoss,
        });
        setPreAssessment(resp?.preAssessment);
        setProfitOrLoss(resp?.totalProfitOrLoss);
        setShowTable(true);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [provider, company, amount]);

  const onSubmit = useCallback(async () => {
    setIsLoading(true);
    // const url = "/api/decision_engine";
    const url = "http://localhost:5000/decision_engine";
    const body = {
      preAssessment: preAssessment,
      company: company,
      year: year,
      profitOrLoss: profitOrLoss,
      provider,
      loanAmount: amount,
    };
    await axios
      .post(url, body)
      .then((response) => {
        const resp = response?.data;
        toast.success(resp?.message);
        setShowTable(false);
        setPreAssessment(20);
        setProfitOrLoss(0);
        setCompany("");
        setAmount("0");
        setYear("");
        setProvider("Xero");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [company, year, profitOrLoss, preAssessment, provider, amount]);

  const tbodyContent = (
    <tbody>
      {tableContent.map((b: TableBodyProps, id) => (
        <tr key={id} className="p-1">
          <td className="p-1 border-2">
            {b.month}-{b.year}
          </td>
          <td className="p-1 border-2">{b.profitOrLoss}</td>
          <td className="p-1 border-2">{b.assetsValue}</td>
        </tr>
      ))}
    </tbody>
  );
  const tfootContent = (
    <tfoot className="font-bold bg-gray-300">
      <tr>
        <td className="p-1 border-2">Total</td>
        <td className="p-1 border-2">{tableFooter.totalProfitOrLoss}</td>
        <td className="p-1 border-2">{tableFooter.totalAssetsValue}</td>
      </tr>
    </tfoot>
  );
  return (
    <div className="flex flex-col justify-center p-2 gap-2">
      <Input
        label="Company"
        type="text"
        name="company"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        disabled={isLoading}
      />
      <Input
        label="Year Established"
        type="month"
        name="year_established"
        value={year}
        onChange={(e) => setYear(e.target.value)}
        disabled={isLoading}
      />
      <Input
        label="Loan Amount (SGD)"
        type="number"
        name="loan_amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        disabled={isLoading}
      />
      <Input
        label="Accounting Provider"
        type="select"
        name="provider"
        value={provider}
        onChange={(e) => setProvider(e.target.value)}
        disabled={isLoading}
        options={["Xero", "MYOB"]}
      />
      <Button label="Fetch Balance Sheet" onClick={onFetch} />
      {isLoading && (
        <div className="flex justify-center items-center">
          <ClipLoader color="gray" size={50} />
        </div>
      )}
      {showTable && (
        <div className="flex flex-col mb-4">
          <Table
            headers={HEADER}
            body={tbodyContent}
            footer={tfootContent}
            hasBody
          />
          <h1 className="mt-2">
            <span className="font-bold">Pre Assessment:</span> {preAssessment}%
          </h1>
          <Button label="Submit" onClick={onSubmit} />
        </div>
      )}
    </div>
  );
};

export default Form;
