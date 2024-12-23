/**
 * A block that can be used globally
 * that allows for either text on the left
 * and illustration on the right or vice versa
 *
 * @param opts
 */
export default function LeftRightBlock(opts: {
  left: React.ReactNode;
  right: React.ReactNode;
}) {
  const { left, right } = opts;

  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
      <div className="col-span-6">{left}</div>
      <div className="col-span-6">{right}</div>
    </section>
  );
}
