
import ReportCardDialog from "@/components/parent/ReportCardDialog";
import PayFeesDialog from "@/components/parent/PayFeesDialog";
import ParentSidebar from "@/components/parent/ParentSidebar";
import ParentContentRenderer from "@/components/parent/ParentContentRenderer";
import { useParentState } from "@/hooks/useParentState";
import { children } from "@/data/parentData";

const Parent = () => {
  const {
    activeSection,
    setActiveSection,
    selectedChild,
    setSelectedChild,
    reportCardOpen,
    setReportCardOpen,
    payFeesOpen,
    setPayFeesOpen,
  } = useParentState();

  const currentChild = children.find(child => child.id === selectedChild);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <ParentSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      <div className="flex-1 p-8">
        <ParentContentRenderer
          activeSection={activeSection}
          selectedChild={selectedChild}
          children={children}
          currentChild={currentChild}
          onChildChange={setSelectedChild}
          onReportCardOpen={() => setReportCardOpen(true)}
          onPayFeesOpen={() => setPayFeesOpen(true)}
        />
      </div>

      {currentChild && (
        <>
          <ReportCardDialog 
            open={reportCardOpen} 
            onOpenChange={setReportCardOpen}
            childName={currentChild.name}
            className={currentChild.class}
            section={currentChild.section}
          />
          <PayFeesDialog 
            open={payFeesOpen} 
            onOpenChange={setPayFeesOpen}
            childName={currentChild.name}
            className={`${currentChild.class} ${currentChild.section}`}
          />
        </>
      )}
    </div>
  );
};

export default Parent;
