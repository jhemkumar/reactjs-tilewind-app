"use client";
import { useState } from "react";

export default function Home() {
  const [form, setForm] = useState({
    communicationType: "Phone",
    amount: "",
    dealDate: new Date().toISOString().split('T')[0],
    valueDate: "",
    maturity: "",
    spread: "",
    document: null as File | null,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "document" && files) {
      setForm({ ...form, document: files[0] });
    } else {
      setForm({ ...form, [name]: value });
      
      // Real-time validation for spread field
      if (name === "spread") {
        const spreadError = validateSpread(value);
        if (spreadError) {
          setErrors({ ...errors, spread: spreadError });
        } else {
          // Clear error if validation passes
          const newErrors = { ...errors };
          delete newErrors.spread;
          setErrors(newErrors);
        }
      } else {
        // Clear error for other fields when user starts typing
        if (errors[name]) {
          const newErrors = { ...errors };
          delete newErrors[name];
          setErrors(newErrors);
        }
      }
    }
  };

  const validateSpread = (value: string) => {
    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      return "Spread must be a valid number";
    }
    if (numValue < 0 || numValue > 5) {
      return "Spread must be between 0 and 5";
    }
    return "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate spread
    const spreadError = validateSpread(form.spread);
    if (spreadError) {
      setErrors({ ...errors, spread: spreadError });
      return;
    }
    
    setSubmitted(true);
    setErrors({});
  };

  const handleCancel = () => {
    // Handle cancel logic here
    console.log("Form cancelled");
  };

  const handleReset = () => {
    setForm({
      communicationType: "Phone",
      amount: "",
      dealDate: new Date().toISOString().split('T')[0],
      valueDate: "",
      maturity: "",
      spread: "",
      document: null,
    });
    setSubmitted(false);
    setErrors({});
  };

  const ButtonGroup = () => (
    <div className="flex justify-end gap-4 mb-8">
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors font-semibold"
      >
        Cancel
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors font-semibold"
      >
        Reset
      </button>
    </div>
  );

  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col p-0 m-0">
      {/* Header Section */}
      <div className="bg-gray-600 text-white p-6 shadow-md">
        <h1 className="text-3xl font-bold text-center">Bonds Application </h1>
      </div>

      {/* Form Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-12">
        <div className="bg-white p-12 rounded-none shadow-none w-full h-full">
          <form onSubmit={handleSubmit} className="w-full">
            {/* Top Buttons */}
            <ButtonGroup />

            <div className="flex flex-col gap-8 mb-8">
              {/* Section 1: Communication Logs */}
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">1. Communication Logs</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="communicationType">Communication Type</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    id="communicationType"
                    name="communicationType"
                    value={form.communicationType}
                    onChange={handleChange}
                    required
                  >
                    <option value="Phone">Phone</option>
                    <option value="Email">Email</option>
                    <option value="Fax">Fax</option>
                  </select>
                </div>
              </div>

              {/* Section 2: Bond Details */}
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">2. Bond Details</h3>
                <div className="flex flex-col md:flex-row gap-4 mb-4">
                 
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-2" htmlFor="dealDate">Deal Date</label>
                    <input
                      className="w-full px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="date"
                      id="dealDate"
                      name="dealDate"
                      value={form.dealDate}
                      onChange={handleChange}
                      required
                      readOnly
                      disabled
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-2" htmlFor="valueDate">Value Date</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="date"
                      id="valueDate"
                      name="valueDate"
                      value={form.valueDate}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-2" htmlFor="maturity">Maturity Date</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="date"
                      id="maturity"
                      name="maturity"
                      value={form.maturity}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                    <label className="block text-gray-700 mb-2" htmlFor="amount">Amount</label>
                    <input
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      type="number"
                      id="amount"
                      name="amount"
                      value={form.amount}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-700 mb-2" htmlFor="spread">Spread (0-5)</label>
                  <input
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.spread ? 'border-red-500' : 'border-gray-300'
                    }`}
                    type="number"
                    step="0.01"
                    min="0"
                    max="5"
                    id="spread"
                    name="spread"
                    value={form.spread}
                    onChange={handleChange}
                    required
                  />
                  {errors.spread && (
                    <div className="mt-1 text-sm text-red-600">{errors.spread}</div>
                  )}
                  </div>
                </div>
               
              </div>

              {/* Section 3: Document Attachments */}
              <div className="w-full">
                <h3 className="text-lg font-semibold mb-4 border-b pb-2">3. Document Attachments</h3>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="document">Attach Document</label>
                  <input
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="file"
                    id="document"
                    name="document"
                    onChange={handleChange}
                    accept=".pdf,.doc,.docx,.jpg,.png"
                  />
                  {form.document && (
                    <div className="mt-2 text-sm text-gray-600">Selected: {form.document.name}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Bottom Buttons */}
            <ButtonGroup />

            {submitted && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded text-center w-full">
                Your bond application has been received!
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
