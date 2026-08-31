const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ksebhziwctiqvxzfmtmr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZWJoeml3Y3RpcXZ4emZtdG1yIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NzkxMjQ3OSwiZXhwIjoyMTAzNDg4NDc5fQ.UbfUA9FpNriNJiQ2orC9Ucok3luYyMgs5-mrKqf0iDw' // using service role
);

async function test() {
    // Select one row just to see the shape
    const { data, error } = await supabase.from('chat_messages').select('*').limit(1);
    console.log("Shape of chat_messages row:", data, error);
}

test();
