import os
from langchain_community.utilities import SQLDatabase
from langchain_community.agent_toolkits import SQLDatabaseToolkit
from langchain_openai import ChatOpenAI
from langchain import hub
from langchain_core.messages import HumanMessage
from langgraph.prebuilt import create_react_agent

llm = ChatOpenAI(model="gpt-4o-mini")

db = SQLDatabase.from_uri(os.environ.get("DATABASE_URL"))
print(db.dialect)

toolkit = SQLDatabaseToolkit(db=db, llm=llm)

tools = toolkit.get_tools()
tools

prompt_template = hub.pull("langchain-ai/sql-agent-system-prompt")
system_message = prompt_template.format(dialect=db.dialect, top_k=5)

agent_executor = create_react_agent(llm, tools, state_modifier=system_message)

question = "Give me a list of top 10 brands with their respective count of cars in the database"

for step in agent_executor.stream(
    {"messages": [{"role": "user", "content": question}]},
    stream_mode="values",
):
    step["messages"][-1].pretty_print()