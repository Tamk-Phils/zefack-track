const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://ksebhziwctiqvxzfmtmr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtzZWJoeml3Y3RpcXZ4emZtdG1yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5MTI0NzksImV4cCI6MjEwMzQ4ODQ3OX0.TY7dHrxgVygznanPGUj4Bo7duDD6nllJS2oJe-XDJ1Q'
);

async function test() {
    const roomId = '550e8400-e29b-41d4-a716-446655440000';
    console.log("Testing chat_rooms insert...");
    const res1 = await supabase.from('chat_rooms').insert([{
        id: roomId,
        customer_name: 'Test Name',
        customer_email: 'test@test.com',
        last_message: 'hello'
    }]);
    console.log("Rooms Result:", res1);

    console.log("Testing chat_messages insert...");
    const res2 = await supabase.from('chat_messages').insert([{
        id: '550e8400-e29b-41d4-a716-446655440003',
        room_id: roomId,
        sender_name: 'Test Name',
        message: 'hello',
        is_admin: false
    }]);
    console.log("Messages Result:", res2);
}

test();
