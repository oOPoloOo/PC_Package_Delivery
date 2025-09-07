import { useState, useContext } from "react";
import PackageContext from "../../contexts/PackageContext";
import type { CreatePackageRequest } from "../../types";

const NewPackagePage = () => {
  const ctx = useContext(PackageContext); 
  const { addPackage } = ctx!; 


  const [form, setForm] = useState<CreatePackageRequest>({
    senderName: "",
    senderAddress: "",
    senderPhone: "",
    recipientName: "",
    recipientAddress: "",
    recipientPhone: "",
  });

  const [status, setStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    const result = await addPackage(form);
    if ("error" in result) {
      setStatus(result.error);
    } else {
      setStatus(result.success);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 shadow-md rounded-lg bg-white">
      <h2 className="text-2xl font-bold mb-4">Create New Package</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
       
        <div>
          <label className="block font-medium">Sender Name</label>
          <input
            type="text"
            name="senderName"
            value={form.senderName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Sender Address</label>
          <textarea
            name="senderAddress"
            value={form.senderAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Sender Phone</label>
          <input
            type="tel"
            name="senderPhone"
            value={form.senderPhone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        
        <div>
          <label className="block font-medium">Recipient Name</label>
          <input
            type="text"
            name="recipientName"
            value={form.recipientName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Recipient Address</label>
          <textarea
            name="recipientAddress"
            value={form.recipientAddress}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Recipient Phone</label>
          <input
            type="tel"
            name="recipientPhone"
            value={form.recipientPhone}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Package
        </button>
      </form>

      {status && (
        <p className="mt-4 text-center font-medium">
          {status}
        </p>
      )}
    </div>
  );
};

export default NewPackagePage;
