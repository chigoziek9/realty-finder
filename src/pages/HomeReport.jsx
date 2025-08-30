import Layout from "./Layout";

export default function HomeReports() {
  return (
    <Layout>
      <h3 className="text-lg font-semibold mb-6">Home reports</h3>

      <p className="text-sm text-gray-600">
        <span className="text-green-600 underline cursor-pointer">
          Claim a home
        </span>{" "}
        to access home reports and get notifications for homes selling nearby 
        that may affect your estimate.
      </p>
    </Layout>
  );
}
