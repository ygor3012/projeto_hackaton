const supabaseUrl = "https://dnyctvoyevkyhkrqxygs.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRueWN0dm95ZXZreWhrcnF4eWdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzUzNTQ3NjEsImV4cCI6MjA5MDkzMDc2MX0.qMdCxssk6r1-DrvIyBfgHXqDkIRHpOZ96uf1g0-Dq6Y"

const btnLogin = document.getElementById("btn_login");

btnLogin.addEventListener("click", async() =>{
    const email = document.getElementById("input_email").value.trim();
    const senha = document.getElementById("input_senha").value.trim();

    if(!email || !senha){
        alert("Preencha todos os campos!");
        return;
    }

    try{
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha
        });

        if(error){
            alert("Erro " + error.message);
            return;
        }

        alert("Login feito com sucesso!");
        console.log(data);
    } catch (err){
        console.log(err);
        alert("Erro inesperado");
    }
});

document.getElementById("btn_cadastrar").addEventListener("click", async () => {
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
  
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: senha
    });
  
    if (error) {
      alert("Erro: " + error.message);
    } else {
      alert("Conta criada! Verifique seu email.");
      console.log(data);
    }
  });
