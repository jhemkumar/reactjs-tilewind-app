"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface OrderDetails {
  id: string;
  bondName: string;
  amount: number;
  yield: number;
  maturity: string;
  status: "Active" | "Pending" | "Completed";
  issuer: string;
  communicationType: string;
  dealDate: string;
  valueDate: string;
  spread: number;
  documentName?: string;
}

export default function OrderDetails() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock data - in real app, this would come from API
  const mockOrderData: OrderDetails[] = [
    {
      id: "1",
      bondName: "US Treasury 10Y",
      amount: 1000000,
      yield: 4.25,
      maturity: "2034-05-15",
      status: "Active",
      issuer: "US Government",
      communicationType: "Email",
      dealDate: "2024-06-25",
      valueDate: "2024-06-26",
      spread: 2.5,
      documentName: "treasury_bond_agreement.pdf"
    },
    {
      id: "2",
      bondName: "Corporate Bond ABC",
      amount: 500000,
      yield: 5.75,
      maturity: "2029-12-01",
      status: "Pending",
      issuer: "ABC Corp",
      communicationType: "Phone",
      dealDate: "2024-06-24",
      valueDate: "2024-06-25",
      spread: 3.2,
      documentName: "abc_corporate_bond.pdf"
    },
    {
      id: "3",
      bondName: "Municipal Bond XYZ",
      amount: 750000,
      yield: 3.85,
      maturity: "2032-08-20",
      status: "Completed",
      issuer: "XYZ City",
      communicationType: "Fax",
      dealDate: "2024-06-23",
      valueDate: "2024-06-24",
      spread: 1.8
    },
    {
      id: "4",
      bondName: "High Yield Bond DEF",
      amount: 250000,
      yield: 8.50,
      maturity: "2027-03-10",
      status: "Active",
      issuer: "DEF Industries",
      communicationType: "Email",
      dealDate: "2024-06-22",
      valueDate: "2024-06-23",
      spread: 4.1,
      documentName: "def_high_yield_bond.pdf"
    }
  ];

  useEffect(() => {
    if (orderId) {
      const order = mockOrderData.find(item => item.id === orderId);
      setOrderDetails(order || null);
    }
    setLoading(false);
  }, [orderId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Completed": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleBack = () => {
    router.push("/orderbook");
  };

  const handleEdit = () => {
    router.push(`/create-order?id=${orderId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Not Found</h2>
          <p className="text-gray-600 mb-6">The order you're looking for doesn't exist.</p>
          <button
            onClick={handleBack}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Back to Order Book
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen min-w-full bg-gray-100 flex flex-col p-0 m-0">
      {/* Header Section */}
      <div className="bg-gray-600 text-white p-6 shadow-md">
        <div>
          <h1 className="text-3xl font-bold">Order Details</h1>
          <p className="text-gray-300">Order ID: {orderDetails.id}</p>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(orderDetails.status)}`}>
            {orderDetails.status}
          </span>
          <span className="text-sm text-gray-300">Last updated: {new Date().toLocaleDateString()}</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center items-center p-12">
        <div className="bg-white p-12 rounded-none shadow-none w-full h-full">
          {/* Navigation Buttons */}
          <div className="flex justify-end gap-4 mb-8">
            <button
              onClick={handleBack}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors font-semibold"
            >
              Back to Order Book
            </button>
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors font-semibold"
            >
              Edit Order
            </button>
          </div>

          {/* Order Details Sections */}
          <div className="flex flex-col gap-8">
            {/* Section 1: Communication Logs */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">1. Communication Logs</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Communication Type</label>
                <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                  {orderDetails.communicationType}
                </div>
              </div>
            </div>

            {/* Section 2: Bond Details */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">2. Bond Details</h3>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Deal Date</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.dealDate}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Value Date</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.valueDate}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Maturity Date</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.maturity}
                  </div>
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Bond Name</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.bondName}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Amount</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    ${orderDetails.amount.toLocaleString()}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Yield</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.yield}%
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Spread</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.spread}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Document Attachments */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">3. Document Attachments</h3>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Attached Document</label>
                {orderDetails.documentName ? (
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.documentName}
                  </div>
                ) : (
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded text-gray-500">
                    No document attached
                  </div>
                )}
              </div>
            </div>

            {/* Additional Information */}
            <div className="w-full">
              <h3 className="text-lg font-semibold mb-4 border-b pb-2">Additional Information</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Issuer</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.issuer}
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 mb-2">Order ID</label>
                  <div className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded">
                    {orderDetails.id}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 