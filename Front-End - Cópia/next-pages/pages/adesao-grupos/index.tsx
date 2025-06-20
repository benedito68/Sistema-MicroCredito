// pages/admin/dashboard.tsx
import { Layout } from "@/layout"; 
import { usuario_logado } from "@/components/lib/autenticar";
import AdesaoGrupos from "@/components/vaga/page";

//import AvaliacaoFuncionario from "@/components/avaliacao/avaliacao";

export default function Dashboard() {
  return (
    <div>
    <AdesaoGrupos/>
  </div>
  );
}

// Define o layout para esta página
Dashboard.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

 export const getServerSideProps = async (context: any) => {
    const result = await usuario_logado(context);
  
    if (result.redirect) {
      return result; // Redireciona se necessário
    }
  
    return {
      props: result.props, // Passa as props para o componente
    };
  }