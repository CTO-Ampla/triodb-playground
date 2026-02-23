// ============================================================
// TrioDB Playground — Lesson Data (38 lessons)
// Schema SQL, Function Reference
// ============================================================

const LESSON_CATEGORIES = [
  { id: 'DDL', name: 'Schema & DDL', icon: '\u{1F3D7}\uFE0F' },
  { id: 'DML', name: 'Data Manipulation', icon: '\u270F\uFE0F' },
  { id: 'Queries', name: 'Queries', icon: '\u{1F50D}' },
  { id: 'Expressions', name: 'Expressions', icon: '\u{1F9EE}' },
  { id: 'Functions', name: 'Functions', icon: '\u2699\uFE0F' },
  { id: 'Aggregation', name: 'Aggregation', icon: '\u{1F4CA}' },
  { id: 'Joins', name: 'Joins', icon: '\u{1F517}' },
  { id: 'Subqueries', name: 'Subqueries', icon: '\u{1F4E6}' },
  { id: 'CTEs', name: 'CTEs', icon: '\u{1F504}' },
  { id: 'WindowFn', name: 'Window Functions', icon: '\u{1FA9F}' },
  { id: 'Graph', name: 'Graph', icon: '\u{1F578}\uFE0F' },
  { id: 'VectorFTS', name: 'Vector & FTS', icon: '\u{1F9ED}' },
  { id: 'Meta', name: 'Utility & Meta', icon: '\u{1F6E0}\uFE0F' },
];

const LESSONS = [
  // ── DDL Lessons (1-5) ─────────────────────────────────────
  { id:1, cat:'DDL', title:'Creating Tables', subtitle:'Define your schema with typed columns and constraints',
    sections:[
      { heading:'What is it?', body:'<p>Tables are the fundamental storage unit in a relational database. Each table has a name, a set of typed columns, and optional constraints that enforce data integrity.</p>' },
      { heading:'In the database world', body:'<p><code>CREATE TABLE</code> is part of DDL (Data Definition Language). Every SQL database uses it, though the exact type system and constraint syntax varies between engines.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>INT</code>, <code>BIGINT</code>, <code>FLOAT</code>, <code>DOUBLE</code>, <code>BOOL</code>, <code>TEXT</code>, <code>BLOB</code>, <code>DATETIME</code>, and <code>VECTOR(N)</code> types. Use <code>IF NOT EXISTS</code> to safely create tables in scripts that may run multiple times.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Always define a <code>PRIMARY KEY</code></li><li>Use <code>NOT NULL</code> for required fields</li><li>Use <code>DEFAULT</code> for sensible fallbacks</li><li>Composite primary keys span multiple columns with a table-level constraint</li></ul>' },
    ],
    examples:[
      { title:'Basic table', explain:'Create a table with common column types and a primary key',
        sql:`CREATE TABLE test_basic (\n  id INT PRIMARY KEY,\n  name TEXT NOT NULL,\n  email TEXT UNIQUE,\n  salary FLOAT,\n  is_active BOOL DEFAULT TRUE\n);\nSELECT 'Table created' AS result;\nDROP TABLE test_basic;` },
      { title:'All data types', explain:'TrioDB supports INT, BIGINT, FLOAT, DOUBLE, BOOL, TEXT, BLOB, and VECTOR(N)',
        sql:`SELECT typeof(42) AS int_type,\n       typeof(3.14) AS float_type,\n       typeof('hello') AS text_type,\n       typeof(TRUE) AS bool_type,\n       typeof(NULL) AS null_type;` },
      { title:'Composite primary key', explain:'Define a multi-column primary key using a table-level constraint',
        sql:`CREATE TABLE test_composite (\n  employee_id INT NOT NULL,\n  project_id INT NOT NULL,\n  role TEXT DEFAULT 'member',\n  PRIMARY KEY (employee_id, project_id)\n);\nSELECT 'Composite PK table created' AS result;\nDROP TABLE test_composite;` },
      { title:'IF NOT EXISTS', explain:'Safely create a table that may already exist',
        sql:`CREATE TABLE IF NOT EXISTS departments (id INT PRIMARY KEY, name TEXT);\nSELECT 'No error even if exists' AS result;` },
    ]
  },
  { id:2, cat:'DDL', title:'Altering Tables', subtitle:'Modify existing tables without losing data',
    sections:[
      { heading:'What is it?', body:'<p><code>ALTER TABLE</code> lets you evolve your schema after creation \u2014 adding columns, removing them, renaming tables or columns, and changing column types.</p>' },
      { heading:'In the database world', body:'<p>Schema migration is a critical part of application lifecycle. ALTER TABLE operations vary in cost: adding a nullable column is cheap, changing a type may rewrite all rows.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>ADD COLUMN</code>, <code>DROP COLUMN</code>, <code>RENAME TO</code>, <code>RENAME COLUMN</code>, and <code>ALTER COLUMN TYPE</code>. New columns default to NULL for existing rows.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Use <code>ADD COLUMN</code> for extending schemas</li><li><code>DROP COLUMN</code> permanently removes data</li><li>RENAME operations are metadata-only and very fast</li></ul>' },
    ],
    examples:[
      { title:'Add a column', explain:'Add a new column \u2014 existing rows get NULL',
        sql:`ALTER TABLE employees ADD COLUMN test_col TEXT;\nSELECT name, test_col FROM employees WHERE id = 1;\nALTER TABLE employees DROP COLUMN test_col;` },
      { title:'Drop a column', explain:'Remove a column and its data permanently',
        sql:`ALTER TABLE employees ADD COLUMN temp_col INT;\nALTER TABLE employees DROP COLUMN temp_col;\nSELECT 'Column dropped' AS result;` },
      { title:'Rename table', explain:'Rename an entire table',
        sql:`SELECT 'RENAME TO supported' AS feature;` },
      { title:'Change column type', explain:'Alter a column data type with implicit casting',
        sql:`SELECT 'ALTER COLUMN TYPE supported' AS feature;` },
    ]
  },
  { id:3, cat:'DDL', title:'Dropping Tables', subtitle:'Remove tables and all their data permanently',
    sections:[
      { heading:'What is it?', body:'<p><code>DROP TABLE</code> permanently deletes a table, its data, and associated indexes. This is irreversible in production \u2014 always use with caution.</p>' },
      { heading:'In the database world', body:'<p>DROP is the most destructive DDL command. Most production databases require backups before drops. <code>IF EXISTS</code> prevents errors when the table is already gone.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>DROP TABLE</code> and <code>DROP TABLE IF EXISTS</code>. Dropping a table also removes all indexes defined on it.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Always use <code>IF EXISTS</code> in scripts</li><li>In production, back up data before dropping</li><li>There is no UNDO for <code>DROP TABLE</code></li></ul>' },
    ],
    examples:[
      { title:'Drop a table', explain:'Create and then permanently remove a table',
        sql:`CREATE TABLE drop_test (id INT PRIMARY KEY);\nDROP TABLE drop_test;\nSELECT 'Table dropped' AS result;` },
      { title:'Drop if exists', explain:'Safely drop a table that may not exist',
        sql:`DROP TABLE IF EXISTS nonexistent_table;\nSELECT 'No error on missing table' AS result;` },
    ]
  },
  { id:4, cat:'DDL', title:'B-Tree Indexes', subtitle:'Speed up lookups and range scans with B-tree indexes',
    sections:[
      { heading:'What is it?', body:'<p>A B-tree index is a balanced tree data structure that keeps data sorted, allowing fast point lookups (O(log n)) and efficient range scans.</p>' },
      { heading:'In the database world', body:'<p>B-trees are the default index type in virtually every relational database. They work well for equality checks, range queries, and ORDER BY optimization.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>CREATE INDEX</code> creates a B-tree by default. You can explicitly use <code>BTREE</code> or the <code>USING</code> clause. <code>DROP INDEX IF EXISTS</code> safely removes an index.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Index columns you frequently filter or sort by</li><li>Too many indexes slow down writes</li><li>Use <code>IF NOT EXISTS</code> to make index creation idempotent</li></ul>' },
    ],
    examples:[
      { title:'Create an index', explain:'Create a default B-tree index on a column',
        sql:`CREATE INDEX IF NOT EXISTS idx_test ON employees (department);\nSELECT 'Index created' AS result;` },
      { title:'Explicit BTREE index', explain:'Use the BTREE keyword for clarity',
        sql:`SELECT 'BTREE INDEX exists on employees(salary)' AS info;\nSELECT name, salary FROM employees WHERE salary > 95000.0;` },
      { title:'IF NOT EXISTS', explain:'Safely create an index that may already exist',
        sql:`CREATE INDEX IF NOT EXISTS idx_emp_dept ON employees (department);\nSELECT 'No error on duplicate' AS result;` },
      { title:'Drop an index', explain:'Remove an index when no longer needed',
        sql:`CREATE INDEX idx_temp_test ON employees (name);\nDROP INDEX IF EXISTS idx_temp_test;\nSELECT 'Index dropped' AS result;` },
    ]
  },
  { id:5, cat:'DDL', title:'Specialized Indexes', subtitle:'Vector, Text, and Graph indexes for advanced queries',
    sections:[
      { heading:'What is it?', body:'<p>Beyond B-trees, TrioDB offers three specialized index types: <code>VECTOR</code> indexes for similarity search, <code>TEXT</code> indexes for full-text search, and <code>GRAPH</code> indexes for graph traversals.</p>' },
      { heading:'In the database world', body:'<p>Specialized indexes are what separate a multi-model database from a plain RDBMS. Vector indexes use HNSW (Hierarchical Navigable Small World) graphs for approximate nearest-neighbor search.</p>' },
      { heading:'How TrioDB does it', body:'<p>Use <code>CREATE VECTOR INDEX</code> with HNSW parameters (metric, m, ef_construction). <code>CREATE TEXT INDEX</code> enables <code>TEXT_MATCH</code>/<code>TEXT_SCORE</code>. <code>CREATE GRAPH INDEX</code> enables <code>MATCH</code> pattern queries.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Vector = similarity search</li><li>Text = keyword search</li><li>Graph = relationship traversal</li><li>You can combine all three on the same table</li></ul>' },
    ],
    examples:[
      { title:'Vector index', explain:'HNSW index for approximate nearest-neighbor search',
        sql:`SELECT 'VECTOR INDEX exists on employees(bio_vec)' AS info;\nSELECT name, VECTOR_DIMS(bio_vec) AS dims FROM employees WHERE bio_vec IS NOT NULL LIMIT 3;` },
      { title:'Text index', explain:'Enable full-text search with TEXT_MATCH and TEXT_SCORE',
        sql:`SELECT 'TEXT INDEX exists on employees(bio)' AS info;\nSELECT name FROM employees WHERE TEXT_MATCH(bio, 'engineer') LIMIT 3;` },
      { title:'Graph index', explain:'Enable graph traversals via MATCH patterns',
        sql:`SELECT 'GRAPH INDEX exists on employees(id)' AS info;\nSELECT e.name FROM employees e, skills s MATCH (e)-[:HAS_SKILL]->(s) WHERE e.id = 1;` },
    ]
  },

  // ── DML Lessons (6-9) ─────────────────────────────────────
  { id:6, cat:'DML', title:'Inserting Data', subtitle:'Add rows to your tables',
    sections:[
      { heading:'What is it?', body:'<p><code>INSERT</code> adds new rows to a table. You can insert a single row with all columns, specify only certain columns, or batch multiple rows in one statement.</p>' },
      { heading:'In the database world', body:'<p>INSERT is part of DML (Data Manipulation Language). Multi-row inserts are significantly faster than individual statements because they reduce transaction overhead.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports full-row INSERT, column-list INSERT (unmentioned columns get DEFAULT or NULL), and multi-row VALUES. All inserts are ACID-compliant.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Use column lists for clarity and safety</li><li>Multi-row inserts are faster for bulk loading</li><li>Always match the number of values to the number of columns</li></ul>' },
    ],
    examples:[
      { title:'Full row insert', explain:'Insert a complete row with values for every column',
        sql:`INSERT INTO employees VALUES\n  (100, 'Test User', 'test@co.com', 'Engineering',\n   75000.0, 2000.0, TRUE, 1700000000000,\n   NULL, 'Test bio', NULL, NULL);\nSELECT id, name, department, salary FROM employees WHERE id = 100;\nDELETE FROM employees WHERE id = 100;` },
      { title:'Column list insert', explain:'Specify only the columns you want to set',
        sql:`INSERT INTO employees (id, name, email, department, salary, is_active)\nVALUES (101, 'Column List User', 'collist@co.com', 'Design', 80000.0, TRUE);\nSELECT id, name, department, salary, bonus, is_active\nFROM employees WHERE id = 101;\nDELETE FROM employees WHERE id = 101;` },
      { title:'Multi-row insert', explain:'Insert multiple rows in a single statement for efficiency',
        sql:`INSERT INTO audit_log VALUES\n  (100, 'test', 'INSERT', 100, 1700000000000, 'Row A'),\n  (101, 'test', 'INSERT', 101, 1700000000000, 'Row B'),\n  (102, 'test', 'INSERT', 102, 1700000000000, 'Row C');\nSELECT id, table_name, details FROM audit_log WHERE id >= 100;\nDELETE FROM audit_log WHERE id >= 100;` },
    ]
  },
  { id:7, cat:'DML', title:'Upserts (ON CONFLICT)', subtitle:'Insert or update in a single atomic operation',
    sections:[
      { heading:'What is it?', body:'<p>An upsert combines INSERT and UPDATE: if a row with the same key exists, it updates; otherwise, it inserts. This eliminates the need for check-then-insert patterns.</p>' },
      { heading:'In the database world', body:'<p>Different databases use different syntax: PostgreSQL uses <code>ON CONFLICT</code>, MySQL uses <code>ON DUPLICATE KEY</code>, SQLite uses <code>OR REPLACE</code>.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB follows PostgreSQL\'s <code>ON CONFLICT</code> syntax. Specify the conflict column(s), then <code>DO UPDATE SET</code> to update, or <code>DO NOTHING</code> to silently skip.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>DO UPDATE</code> = upsert (update on conflict)</li><li><code>DO NOTHING</code> = skip on conflict</li><li>The conflict target must be a unique or primary key constraint</li></ul>' },
    ],
    examples:[
      { title:'Upsert (DO UPDATE)', explain:'Insert a new row, or update if the key already exists',
        sql:`INSERT INTO departments (id, name, budget)\nVALUES (99, 'Test Dept', 100000.0)\nON CONFLICT (id) DO UPDATE SET budget = 100000.0;\nSELECT * FROM departments WHERE id = 99;\nINSERT INTO departments (id, name, budget)\nVALUES (99, 'Test Dept', 200000.0)\nON CONFLICT (id) DO UPDATE SET budget = 200000.0;\nSELECT * FROM departments WHERE id = 99;\nDELETE FROM departments WHERE id = 99;` },
      { title:'Skip on conflict (DO NOTHING)', explain:'Silently skip the insert if a conflicting row exists',
        sql:`INSERT INTO departments (id, name, budget)\nVALUES (1, 'Engineering', 999999.0)\nON CONFLICT (id) DO NOTHING;\nSELECT id, name, budget FROM departments WHERE id = 1;` },
    ]
  },
  { id:8, cat:'DML', title:'Updating Data', subtitle:'Modify existing rows with expressions',
    sections:[
      { heading:'What is it?', body:'<p><code>UPDATE</code> modifies column values in existing rows. You can update one column or many, use expressions to compute new values, and target specific rows with <code>WHERE</code>.</p>' },
      { heading:'In the database world', body:'<p>UPDATE without WHERE is one of the most dangerous SQL operations \u2014 it affects every row. Always double-check your WHERE clause before running updates in production.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports single-column, multi-column, and expression-based updates. You can reference the current value (e.g., <code>salary = salary * 1.05</code>) in SET expressions.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Always include WHERE unless you intend to update all rows</li><li>Use expressions for computed updates</li><li>Multi-column SET uses commas between assignments</li></ul>' },
    ],
    examples:[
      { title:'Simple update', explain:'Update one column for rows matching a condition',
        sql:`SELECT name, salary FROM employees WHERE id = 9;\nUPDATE employees SET salary = salary + 1.0 WHERE id = 9;\nSELECT name, salary FROM employees WHERE id = 9;\nUPDATE employees SET salary = salary - 1.0 WHERE id = 9;` },
      { title:'Multi-column update', explain:'Update several columns at once',
        sql:`SELECT name, salary, bonus FROM employees WHERE id = 2;\nUPDATE employees SET salary = salary + 1.0, bonus = bonus + 1.0 WHERE id = 2;\nSELECT name, salary, bonus FROM employees WHERE id = 2;\nUPDATE employees SET salary = salary - 1.0, bonus = bonus - 1.0 WHERE id = 2;` },
      { title:'Expression update', explain:'Use a formula to compute the new value',
        sql:`SELECT name, salary FROM employees WHERE id = 9;\nUPDATE employees SET salary = salary * 1.01 WHERE id = 9;\nSELECT name, salary AS salary_after_1pct_raise FROM employees WHERE id = 9;\nUPDATE employees SET salary = salary / 1.01 WHERE id = 9;` },
    ]
  },
  { id:9, cat:'DML', title:'Deleting Data', subtitle:'Remove rows from a table',
    sections:[
      { heading:'What is it?', body:'<p><code>DELETE</code> removes rows from a table. With WHERE, it removes matching rows. Without WHERE, it removes ALL rows \u2014 the table structure remains but becomes empty.</p>' },
      { heading:'In the database world', body:'<p>DELETE is permanent in auto-commit mode. Use transactions (<code>BEGIN</code>/<code>ROLLBACK</code>) to test deletes safely.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports DELETE with and without WHERE. Deleted rows are immediately reclaimed. Use <code>COUNT(*)</code> after deletion to verify the result.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Always test DELETE with SELECT first \u2014 use the same WHERE</li><li>DELETE without WHERE is valid but dangerous</li></ul>' },
    ],
    examples:[
      { title:'Delete with WHERE', explain:'Remove specific rows matching a condition',
        sql:`INSERT INTO audit_log VALUES\n  (200, 'test', 'DELETE_TEST', 0, 1700000000000, 'Will be deleted');\nSELECT * FROM audit_log WHERE id = 200;\nDELETE FROM audit_log WHERE id = 200;\nSELECT COUNT(*) AS remaining FROM audit_log WHERE id = 200;` },
      { title:'Delete all rows', explain:'Remove every row from a table (table structure remains)',
        sql:`CREATE TABLE delete_demo (id INT PRIMARY KEY, val TEXT);\nINSERT INTO delete_demo VALUES (1, 'a'), (2, 'b'), (3, 'c');\nSELECT * FROM delete_demo;\nDELETE FROM delete_demo;\nSELECT COUNT(*) AS rows_left FROM delete_demo;\nDROP TABLE delete_demo;` },
    ]
  },

  // ── Query Lessons (10-15) ─────────────────────────────────
  { id:10, cat:'Queries', title:'Your First SELECT', subtitle:'Retrieve data from tables',
    sections:[
      { heading:'What is it?', body:'<p><code>SELECT</code> is the most used SQL statement. It retrieves data from tables. You can select all columns with <code>*</code>, pick specific columns, rename them with aliases, or remove duplicates with <code>DISTINCT</code>.</p>' },
      { heading:'In the database world', body:'<p>The result of a SELECT is always a virtual table (result set) with named columns and rows. Column aliases only affect the output names, not the underlying data.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>SELECT *</code>, column lists, <code>AS</code> aliases, <code>DISTINCT</code>, table aliases, and <code>table.*</code> syntax. You can also SELECT without FROM for computed expressions.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Use specific column names instead of <code>*</code> in production</li><li><code>AS</code> aliases rename columns in output</li><li><code>DISTINCT</code> eliminates duplicate rows</li><li>Table aliases (e.g., <code>employees e</code>) shorten queries</li></ul>' },
    ],
    examples:[
      { title:'SELECT *', explain:'Retrieve all columns from a table',
        sql:`SELECT * FROM employees;` },
      { title:'Select specific columns', explain:'Choose only the columns you need',
        sql:`SELECT name, department, salary FROM employees;` },
      { title:'Column aliases', explain:'Rename columns in the output using AS',
        sql:`SELECT name AS employee_name, salary AS annual_salary FROM employees;` },
      { title:'DISTINCT', explain:'Remove duplicate rows from results',
        sql:`SELECT DISTINCT department FROM employees;` },
    ]
  },
  { id:11, cat:'Queries', title:'Filtering with WHERE', subtitle:'Narrow results with comparison operators',
    sections:[
      { heading:'What is it?', body:'<p><code>WHERE</code> filters rows before they appear in results. It supports all comparison operators: <code>=</code>, <code>!=</code>, <code>&lt;&gt;</code>, <code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code>.</p>' },
      { heading:'In the database world', body:'<p>WHERE is the most fundamental filtering mechanism in SQL. Indexes on filtered columns dramatically speed up WHERE clauses.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports all standard comparison operators. Both <code>!=</code> and <code>&lt;&gt;</code> work for not-equals. Comparisons work across all data types.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>=</code> for exact match, <code>!=</code> or <code>&lt;&gt;</code> for not-equals</li><li><code>&lt;</code>, <code>&gt;</code>, <code>&lt;=</code>, <code>&gt;=</code> for ranges</li><li>Index the columns you filter by most</li></ul>' },
    ],
    examples:[
      { title:'Equals', explain:'Filter rows where a column matches a value',
        sql:`SELECT name FROM employees WHERE department = 'Engineering';` },
      { title:'Not equals', explain:'Filter rows where a column does not match',
        sql:`SELECT name FROM employees WHERE department != 'Engineering';` },
      { title:'Less than', explain:'Find values below a threshold',
        sql:`SELECT name, salary FROM employees WHERE salary < 80000.0;` },
      { title:'Greater or equal', explain:'Find values at or above a threshold',
        sql:`SELECT name, salary FROM employees WHERE salary >= 95000.0;` },
    ]
  },
  { id:12, cat:'Queries', title:'Boolean Logic (AND, OR, NOT)', subtitle:'Combine conditions for precise filtering',
    sections:[
      { heading:'What is it?', body:'<p>Boolean operators combine multiple conditions. <code>AND</code> requires all to be true. <code>OR</code> requires at least one. <code>NOT</code> negates. Parentheses control evaluation order.</p>' },
      { heading:'In the database world', body:'<p>SQL uses three-valued logic (TRUE, FALSE, NULL). AND has higher precedence than OR, so use parentheses to make intent clear.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>AND</code>, <code>OR</code>, <code>NOT</code>, and arbitrary nesting with parentheses. Boolean columns can be used directly in WHERE.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Use parentheses for clarity</li><li>AND binds tighter than OR</li><li>NOT can negate any boolean expression</li></ul>' },
    ],
    examples:[
      { title:'AND', explain:'Both conditions must be true',
        sql:`SELECT name FROM employees WHERE department = 'Engineering' AND salary > 90000.0;` },
      { title:'OR', explain:'At least one condition must be true',
        sql:`SELECT name FROM employees WHERE department = 'Sales' OR department = 'Design';` },
      { title:'NOT', explain:'Negate a boolean expression',
        sql:`SELECT name FROM employees WHERE NOT is_active;` },
      { title:'Complex boolean', explain:'Parentheses control evaluation order',
        sql:`SELECT name FROM employees\nWHERE (department = 'Engineering' OR department = 'Data Science')\n  AND salary > 90000.0\n  AND is_active = TRUE;` },
    ]
  },
  { id:13, cat:'Queries', title:'Pattern Matching (LIKE, IN, BETWEEN)', subtitle:'Match patterns, ranges, and value lists',
    sections:[
      { heading:'What is it?', body:'<p>Beyond simple comparisons, SQL offers pattern matching with <code>LIKE</code> (wildcards), range checking with <code>BETWEEN</code>, and list membership with <code>IN</code>.</p>' },
      { heading:'In the database world', body:'<p><code>LIKE</code> uses <code>%</code> for any sequence and <code>_</code> for exactly one character. <code>BETWEEN</code> is inclusive on both ends. <code>IN</code> is shorthand for multiple OR conditions.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>LIKE</code>, <code>NOT LIKE</code>, <code>IN</code> (list), <code>NOT IN</code>, <code>BETWEEN</code>, and <code>NOT BETWEEN</code>.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>LIKE \'%text%\'</code> scans every row (no index help)</li><li><code>IN</code> with a short list is efficient</li><li><code>BETWEEN</code> is inclusive on both ends</li></ul>' },
    ],
    examples:[
      { title:'IN (list)', explain:'Check if a value matches any in a list',
        sql:`SELECT name FROM employees WHERE department IN ('Engineering', 'Design');` },
      { title:'BETWEEN', explain:'Check if a value falls within an inclusive range',
        sql:`SELECT name, salary FROM employees WHERE salary BETWEEN 85000.0 AND 100000.0;` },
      { title:'LIKE', explain:'Pattern match with % (any chars) and _ (one char)',
        sql:`SELECT name FROM employees WHERE name LIKE 'A%';` },
      { title:'NOT LIKE', explain:'Exclude rows matching a pattern',
        sql:`SELECT name FROM employees WHERE name NOT LIKE '%e%';` },
    ]
  },
  { id:14, cat:'Queries', title:'NULL Handling', subtitle:'Understand and work with missing values',
    sections:[
      { heading:'What is it?', body:'<p>NULL represents an unknown or missing value. It is not zero, not an empty string \u2014 it is the absence of any value. <code>NULL = NULL</code> is FALSE (actually UNKNOWN).</p>' },
      { heading:'In the database world', body:'<p>Comparisons with NULL always yield UNKNOWN. You must use <code>IS NULL</code> / <code>IS NOT NULL</code> to test for it. Functions like <code>COALESCE</code> provide default values.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB follows standard SQL NULL semantics. <code>IS NULL</code> / <code>IS NOT NULL</code> for testing. <code>COALESCE(a, b, ...)</code> returns the first non-NULL. <code>NULLIF(a, b)</code> returns NULL if a equals b.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Never use <code>= NULL</code> \u2014 use <code>IS NULL</code></li><li>NULL propagates through expressions (<code>NULL + 5 = NULL</code>)</li><li>Use <code>COALESCE</code> for safe defaults</li></ul>' },
    ],
    examples:[
      { title:'IS NULL', explain:'Test whether a value is missing',
        sql:`SELECT name FROM employees WHERE bonus IS NULL;` },
      { title:'IS NOT NULL', explain:'Test whether a value exists',
        sql:`SELECT name FROM employees WHERE bonus IS NOT NULL;` },
      { title:'COALESCE', explain:'Return the first non-NULL value as a default',
        sql:`SELECT name, COALESCE(bonus, 0.0) AS safe_bonus FROM employees;` },
      { title:'NULLIF', explain:'Return NULL when two values are equal',
        sql:`SELECT NULLIF(1, 1) AS is_null, NULLIF(1, 2) AS is_one;` },
    ]
  },
  { id:15, cat:'Queries', title:'Sorting & Pagination', subtitle:'Control result order and page through data',
    sections:[
      { heading:'What is it?', body:'<p><code>ORDER BY</code> sorts results. <code>LIMIT</code> restricts how many rows to return. <code>OFFSET</code> skips rows for pagination.</p>' },
      { heading:'In the database world', body:'<p>Without ORDER BY, SQL makes no guarantee about row order. ASC (ascending) is the default. Multi-column ORDER BY sorts by the first column, then breaks ties with subsequent columns.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>ORDER BY</code> with ASC/DESC per column, expressions, and column aliases. <code>LIMIT</code> and <code>OFFSET</code> enable pagination.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Always use ORDER BY when row order matters</li><li>LIMIT without ORDER BY returns arbitrary rows</li><li>OFFSET skips rows (OFFSET 10 = skip first 10)</li></ul>' },
    ],
    examples:[
      { title:'ORDER BY', explain:'Sort results in descending order',
        sql:`SELECT name, salary FROM employees ORDER BY salary DESC;` },
      { title:'Multi-column sort', explain:'Sort by department, then by salary within each',
        sql:`SELECT name, department, salary FROM employees\nORDER BY department ASC, salary DESC;` },
      { title:'LIMIT', explain:'Return only the top N results',
        sql:`SELECT name FROM employees ORDER BY salary DESC LIMIT 3;` },
      { title:'Pagination', explain:'Skip rows with OFFSET for page-by-page results',
        sql:`SELECT name, salary FROM employees ORDER BY salary DESC LIMIT 3 OFFSET 3;` },
    ]
  },

  // ── Expression Lessons (16-18) ────────────────────────────
  { id:16, cat:'Expressions', title:'Arithmetic Operators', subtitle:'Perform math in SQL expressions',
    sections:[
      { heading:'What is it?', body:'<p>SQL supports standard arithmetic: <code>+</code>, <code>-</code>, <code>*</code>, <code>/</code>, and <code>%</code> (modulo). Use these in SELECT, WHERE, ORDER BY, and anywhere an expression is accepted.</p>' },
      { heading:'In the database world', body:'<p>Arithmetic follows standard precedence: <code>*</code> and <code>/</code> bind tighter than <code>+</code> and <code>-</code>. Use parentheses to override.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports all five arithmetic operators with standard precedence. Unary minus negates a value. Integer division truncates; use FLOAT for decimal results.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Use arithmetic in SELECT for computed columns</li><li>Parentheses override precedence</li><li>Mix arithmetic with column values for dynamic calculations</li></ul>' },
    ],
    examples:[
      { title:'Addition', explain:'Add a constant to a column value',
        sql:`SELECT name, salary + 5000.0 AS with_raise FROM employees WHERE id = 1;` },
      { title:'Multiplication', explain:'Compute a projected value',
        sql:`SELECT name, salary * 1.1 AS projected FROM employees WHERE id <= 3;` },
      { title:'Modulo', explain:'Get the remainder of division',
        sql:`SELECT id, id % 3 AS grp FROM employees;` },
      { title:'Precedence', explain:'Parentheses override default operator precedence',
        sql:`SELECT name, (salary + bonus) * 1.1 AS total FROM employees WHERE id = 1;` },
    ]
  },
  { id:17, cat:'Expressions', title:'Type Casting (CAST)', subtitle:'Convert between data types explicitly',
    sections:[
      { heading:'What is it?', body:'<p><code>CAST</code> converts a value from one data type to another. Useful when you need to force a specific type for comparison, display, or storage.</p>' },
      { heading:'In the database world', body:'<p>Implicit casting happens automatically in many cases. Explicit CAST is needed when the conversion is ambiguous or when you want to truncate (e.g., FLOAT to INT).</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>CAST(expr AS type)</code> with <code>INT</code>, <code>BIGINT</code>, <code>FLOAT</code>, <code>DOUBLE</code>, <code>TEXT</code>, and <code>BOOL</code> targets.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>CAST(3.7 AS INT)</code> = 3 (truncation)</li><li>CAST works within expressions</li><li>String-to-number conversion requires valid input</li></ul>' },
    ],
    examples:[
      { title:'CAST to INT', explain:'Convert to integer, truncating decimals',
        sql:`SELECT CAST(3.7 AS INT) AS int_val;` },
      { title:'CAST to FLOAT', explain:'Convert to floating-point number',
        sql:`SELECT CAST(42 AS FLOAT) AS float_val;` },
      { title:'CAST to TEXT', explain:'Convert any value to its string form',
        sql:`SELECT CAST(12345 AS TEXT) AS text_val;` },
      { title:'CAST in expression', explain:'Use CAST within larger calculations',
        sql:`SELECT name, CAST(salary AS INT) * 2 AS doubled FROM employees WHERE id = 1;` },
    ]
  },
  { id:18, cat:'Expressions', title:'Conditional Logic (CASE WHEN)', subtitle:'Add if-then-else logic to your queries',
    sections:[
      { heading:'What is it?', body:'<p><code>CASE WHEN</code> is SQL\'s if-then-else. It evaluates conditions top-to-bottom and returns the first matching THEN value. ELSE provides a fallback.</p>' },
      { heading:'In the database world', body:'<p>CASE is extremely versatile \u2014 use it in SELECT, WHERE, ORDER BY, and even GROUP BY. It replaces procedural IF statements.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports searched CASE, nested CASE, CASE in WHERE/ORDER BY, and <code>IIF()</code> as a shorthand for simple conditions.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Always include ELSE for a default</li><li>CASE can be nested for complex logic</li><li><code>IIF(cond, true_val, false_val)</code> is a compact shorthand</li></ul>' },
    ],
    examples:[
      { title:'Searched CASE', explain:'Evaluate conditions and return matching values',
        sql:`SELECT name, salary,\n       CASE\n           WHEN salary >= 100000.0 THEN 'senior'\n           WHEN salary >= 85000.0 THEN 'mid'\n           ELSE 'junior'\n       END AS level\nFROM employees;` },
      { title:'Nested CASE', explain:'Multi-level conditional logic',
        sql:`SELECT name,\n       CASE\n           WHEN department = 'Engineering' THEN\n               CASE WHEN salary > 90000.0 THEN 'Sr Eng' ELSE 'Jr Eng' END\n           WHEN department = 'Data Science' THEN 'DS'\n           ELSE 'Other'\n       END AS role_code\nFROM employees;` },
      { title:'CASE in WHERE', explain:'Use conditional logic inside a filter',
        sql:`SELECT name FROM employees\nWHERE CASE WHEN department = 'Sales' THEN salary + bonus ELSE salary END > 90000.0;` },
      { title:'IIF shorthand', explain:'Inline if for simple two-way conditions',
        sql:`SELECT name, IIF(salary > 90000.0, 'senior', 'junior') AS tier\nFROM employees WHERE id <= 5;` },
    ]
  },

  // ── Function Lessons (19-22) ──────────────────────────────
  { id:19, cat:'Functions', title:'String Functions', subtitle:'Manipulate text with built-in string functions',
    sections:[
      { heading:'What is it?', body:'<p>String functions transform and inspect text values. TrioDB provides functions for measuring length, changing case, trimming whitespace, extracting substrings, and more.</p>' },
      { heading:'How TrioDB does it', body:'<p>Available: <code>LENGTH</code>, <code>UPPER</code>, <code>LOWER</code>, <code>TRIM</code>/<code>LTRIM</code>/<code>RTRIM</code>, <code>SUBSTR</code>, <code>REPLACE</code>, <code>CONCAT</code>, <code>INSTR</code>, <code>REVERSE</code>, <code>LEFT</code>, <code>RIGHT</code>.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>CONCAT</code> joins strings together</li><li><code>SUBSTR(str, start, len)</code> uses 1-based positions</li><li><code>REPLACE</code> replaces all occurrences, not just the first</li></ul>' },
    ],
    examples:[
      { title:'LENGTH', explain:'Get the number of characters in a string',
        sql:`SELECT name, LENGTH(name) AS name_len FROM employees WHERE id <= 3;` },
      { title:'UPPER / LOWER', explain:'Change case for comparison or display',
        sql:`SELECT UPPER(name) AS upper_name, LOWER(department) AS lower_dept\nFROM employees WHERE id = 1;` },
      { title:'SUBSTR', explain:'Extract a portion of a string',
        sql:`SELECT SUBSTR(name, 1, 5) AS short_name FROM employees WHERE id <= 3;` },
      { title:'CONCAT & REPLACE', explain:'Join strings and replace substrings',
        sql:`SELECT CONCAT(name, ' - ', department) AS label FROM employees WHERE id <= 3;` },
    ]
  },
  { id:20, cat:'Functions', title:'Math Functions', subtitle:'Round, absolute value, powers, logarithms, and more',
    sections:[
      { heading:'What is it?', body:'<p>Math functions provide common numerical operations beyond basic arithmetic: rounding, absolute value, powers, roots, logarithms, and random numbers.</p>' },
      { heading:'How TrioDB does it', body:'<p>Available: <code>ABS</code>, <code>ROUND</code>, <code>CEIL</code>/<code>CEILING</code>, <code>FLOOR</code>, <code>SQRT</code>, <code>POWER</code>/<code>POW</code>, <code>MOD</code>, <code>SIGN</code>, <code>LOG</code>, <code>LOG10</code>, <code>EXP</code>, <code>PI()</code>, <code>RANDOM()</code>.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>ROUND(val, N)</code> rounds to N decimal places</li><li>CEIL rounds up, FLOOR rounds down</li><li><code>RANDOM()</code> returns a different value each call</li></ul>' },
    ],
    examples:[
      { title:'ABS & ROUND', explain:'Absolute value and controlled rounding',
        sql:`SELECT ABS(-42) AS abs_val;\nSELECT name, ROUND(salary / 12.0, 2) AS monthly FROM employees WHERE id <= 3;` },
      { title:'CEIL & FLOOR', explain:'Round up or down to nearest integer',
        sql:`SELECT CEIL(4.2) AS c, CEILING(4.2) AS c2, FLOOR(4.8) AS f;` },
      { title:'SQRT & POWER', explain:'Square root and exponentiation',
        sql:`SELECT SQRT(144) AS sq, POWER(2, 10) AS pw, POW(3, 3) AS pw2;` },
      { title:'LOG & EXP', explain:'Natural logarithm, base-10 log, and e^n',
        sql:`SELECT LOG(1) AS ln1, LOG10(100) AS log100, EXP(0) AS exp0;` },
    ]
  },
  { id:21, cat:'Functions', title:'Date & Time Functions', subtitle:'Extract and manipulate temporal data',
    sections:[
      { heading:'What is it?', body:'<p>Date/time functions extract components from timestamps and return the current time. TrioDB stores timestamps as BIGINT milliseconds since Unix epoch.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>NOW()</code> returns the current timestamp. <code>DATE(ts)</code> and <code>TIME(ts)</code> extract parts. <code>YEAR</code>, <code>MONTH</code>, <code>DAY</code>, <code>HOUR</code>, <code>MINUTE</code>, <code>SECOND</code> extract individual components.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Timestamps are milliseconds since Unix epoch (Jan 1, 1970)</li><li><code>NOW()</code> gives the current time</li><li>Each extraction function takes a timestamp and returns an integer</li></ul>' },
    ],
    examples:[
      { title:'NOW', explain:'Get the current timestamp',
        sql:`SELECT NOW() AS current_ts;` },
      { title:'DATE & TIME', explain:'Extract date and time portions from a timestamp',
        sql:`SELECT DATE(1704067200000) AS d;\nSELECT TIME(1704067200000) AS t;` },
      { title:'Components', explain:'Extract year, month, day, hour, minute, second',
        sql:`SELECT YEAR(1704067200000) AS y,\n       MONTH(1704067200000) AS m,\n       DAY(1704067200000) AS d,\n       HOUR(1704067200000) AS h,\n       MINUTE(1704067200000) AS mi,\n       SECOND(1704067200000) AS s;` },
    ]
  },
  { id:22, cat:'Functions', title:'Utility Functions', subtitle:'TYPEOF, COALESCE, IIF, IFNULL \u2014 essential helpers',
    sections:[
      { heading:'What is it?', body:'<p>Utility functions handle common tasks: inspecting types, providing defaults for NULLs, and simple conditional logic. These are the glue functions you use everywhere.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>TYPEOF(expr)</code> returns the type name. <code>COALESCE(a, b, ...)</code> returns first non-NULL. <code>IIF(cond, t, f)</code> is a compact conditional. <code>IFNULL(a, b)</code> defaults NULLs.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Use <code>TYPEOF</code> for debugging type issues</li><li><code>COALESCE</code> handles NULL chains</li><li><code>IIF</code> is shorter than CASE for two-way branching</li></ul>' },
    ],
    examples:[
      { title:'TYPEOF', explain:'Inspect the data type of any expression',
        sql:`SELECT TYPEOF(42) AS t_int,\n       TYPEOF(3.14) AS t_float,\n       TYPEOF('hello') AS t_text,\n       TYPEOF(TRUE) AS t_bool,\n       TYPEOF(NULL) AS t_null;` },
      { title:'IIF', explain:'Inline conditional with three arguments',
        sql:`SELECT name, IIF(salary > 90000.0, 'senior', 'junior') AS tier\nFROM employees WHERE id <= 5;` },
      { title:'IFNULL', explain:'Provide a default value for NULL',
        sql:`SELECT name, IFNULL(bonus, 0.0) AS bonus FROM employees WHERE id <= 5;` },
    ]
  },

  // ── Aggregation Lessons (23-25) ───────────────────────────
  { id:23, cat:'Aggregation', title:'COUNT, SUM, AVG, MIN, MAX', subtitle:'Summarize data with aggregate functions',
    sections:[
      { heading:'What is it?', body:'<p>Aggregate functions reduce many rows into a single summary value. <code>COUNT</code> counts rows, <code>SUM</code> adds numbers, <code>AVG</code> averages, <code>MIN</code>/<code>MAX</code> find extremes.</p>' },
      { heading:'How TrioDB does it', body:'<p>All five standard aggregates are supported. They work in simple queries (entire table) and with GROUP BY (per group). They can also be used as window functions with <code>OVER()</code>.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>COUNT(*)</code> counts all rows; <code>COUNT(col)</code> counts non-NULLs</li><li>AVG ignores NULLs, which may skew results</li><li>Non-aggregated columns need GROUP BY</li></ul>' },
    ],
    examples:[
      { title:'COUNT', explain:'Count all rows, or just non-NULL values in a column',
        sql:`SELECT COUNT(*) AS total, COUNT(bonus) AS with_bonus FROM employees;` },
      { title:'SUM & AVG', explain:'Total and average of numeric columns',
        sql:`SELECT SUM(salary) AS total_salary, AVG(salary) AS avg_salary FROM employees;` },
      { title:'MIN & MAX', explain:'Find the smallest and largest values',
        sql:`SELECT MIN(salary) AS lowest, MAX(salary) AS highest FROM employees;` },
    ]
  },
  { id:24, cat:'Aggregation', title:'GROUP BY', subtitle:'Aggregate data by categories',
    sections:[
      { heading:'What is it?', body:'<p><code>GROUP BY</code> divides rows into groups based on column values, then applies aggregate functions to each group independently.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports single-column, multi-column, and expression-based GROUP BY. Combine with WHERE (filter before grouping) and ORDER BY (sort groups).</p>' },
      { heading:'Key takeaways', body:'<ul><li>Every non-aggregated column must be in GROUP BY</li><li>WHERE filters rows before grouping</li><li>You can GROUP BY computed expressions like CASE</li></ul>' },
    ],
    examples:[
      { title:'Simple GROUP BY', explain:'Group rows and count per group',
        sql:`SELECT department, COUNT(*) AS cnt\nFROM employees\nGROUP BY department;` },
      { title:'Multiple aggregates', explain:'Several aggregate functions in one query',
        sql:`SELECT department,\n       COUNT(*) AS cnt,\n       SUM(salary) AS total_sal,\n       ROUND(AVG(salary), 2) AS avg_sal,\n       MIN(salary) AS min_sal,\n       MAX(salary) AS max_sal\nFROM employees\nGROUP BY department;` },
      { title:'Multi-column grouping', explain:'Group by two columns for finer detail',
        sql:`SELECT department, is_active, COUNT(*) AS cnt\nFROM employees\nGROUP BY department, is_active;` },
      { title:'GROUP BY expression', explain:'Group by a CASE expression',
        sql:`SELECT CASE WHEN salary >= 90000.0 THEN 'high' ELSE 'low' END AS band,\n       COUNT(*) AS cnt\nFROM employees\nGROUP BY CASE WHEN salary >= 90000.0 THEN 'high' ELSE 'low' END;` },
    ]
  },
  { id:25, cat:'Aggregation', title:'HAVING \u2014 Filtering Groups', subtitle:'Filter aggregated groups with conditions',
    sections:[
      { heading:'What is it?', body:'<p><code>HAVING</code> filters groups after aggregation, while WHERE filters individual rows before. HAVING uses aggregate functions in its condition.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports HAVING with any aggregate expression. Combine WHERE + GROUP BY + HAVING + ORDER BY for a full analytics pipeline.</p>' },
      { heading:'Key takeaways', body:'<ul><li>WHERE filters rows, HAVING filters groups</li><li>HAVING can use aggregate functions</li><li>Pipeline: WHERE \u2192 GROUP BY \u2192 HAVING \u2192 ORDER BY</li></ul>' },
    ],
    examples:[
      { title:'Basic HAVING', explain:'Keep only groups with enough members',
        sql:`SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_sal\nFROM employees\nGROUP BY department\nHAVING COUNT(*) >= 3;` },
      { title:'HAVING with SUM', explain:'Filter groups by aggregate total',
        sql:`SELECT department, SUM(salary) AS total\nFROM employees\nGROUP BY department\nHAVING SUM(salary) > 250000.0;` },
      { title:'Full pipeline', explain:'WHERE + GROUP BY + HAVING + ORDER BY together',
        sql:`SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_sal\nFROM employees\nWHERE is_active = TRUE\nGROUP BY department\nHAVING COUNT(*) >= 2\nORDER BY avg_sal DESC;` },
    ]
  },

  // ── Join Lessons (26-27) ──────────────────────────────────
  { id:26, cat:'Joins', title:'INNER JOIN', subtitle:'Combine rows from multiple tables by matching values',
    sections:[
      { heading:'What is it?', body:'<p><code>INNER JOIN</code> returns only rows that have matching values in both tables. If a row in the left table has no match in the right, it is excluded.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>INNER JOIN</code> (or just <code>JOIN</code>) with <code>ON</code> conditions. You can chain multiple JOINs for multi-table queries.</p>' },
      { heading:'Key takeaways', body:'<ul><li>INNER JOIN = only matching rows from both sides</li><li>Use table aliases for readability</li><li>Always specify the ON condition</li></ul>' },
    ],
    examples:[
      { title:'INNER JOIN', explain:'Match employees to their project assignments',
        sql:`SELECT e.name, p.name AS project\nFROM employees e\nINNER JOIN project_assignments pa ON e.id = pa.employee_id\nINNER JOIN projects p ON pa.project_id = p.id;` },
      { title:'Self-join', explain:'Join a table to itself to compare rows',
        sql:`SELECT a.name AS employee, b.name AS colleague\nFROM employees a\nJOIN employees b ON a.department = b.department AND a.id < b.id;` },
      { title:'JOIN + aggregation', explain:'Aggregate across joined tables',
        sql:`SELECT d.name AS dept, COUNT(e.id) AS headcount, SUM(e.salary) AS total_sal\nFROM departments d\nLEFT JOIN employees e ON d.name = e.department\nGROUP BY d.id, d.name\nORDER BY headcount DESC;` },
    ]
  },
  { id:27, cat:'Joins', title:'LEFT, RIGHT & CROSS JOIN', subtitle:'Outer joins and cartesian products',
    sections:[
      { heading:'What is it?', body:'<p><code>LEFT JOIN</code> keeps all left-table rows, filling NULLs for non-matching right-side columns. <code>RIGHT JOIN</code> does the opposite. <code>CROSS JOIN</code> produces every combination.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>LEFT JOIN</code>, <code>RIGHT JOIN</code>, and cross joins via comma syntax. All produce proper NULL padding.</p>' },
      { heading:'Key takeaways', body:'<ul><li>LEFT JOIN = all left rows, NULLs for missing right</li><li>RIGHT JOIN = mirror of LEFT</li><li>CROSS JOIN = every combo (row count = left \u00d7 right)</li></ul>' },
    ],
    examples:[
      { title:'LEFT JOIN', explain:'Keep all employees, even those without projects',
        sql:`SELECT e.name, pa.project_id, pa.role\nFROM employees e\nLEFT JOIN project_assignments pa ON e.id = pa.employee_id;` },
      { title:'RIGHT JOIN', explain:'Keep all right-side rows, NULLs for non-matching left',
        sql:`SELECT e.name, p.name AS project\nFROM employees e\nRIGHT JOIN project_assignments pa ON e.id = pa.employee_id\nRIGHT JOIN projects p ON pa.project_id = p.id;` },
      { title:'Cross join', explain:'Comma-separated tables produce a cartesian product',
        sql:`SELECT e.name, d.name AS dept\nFROM employees e, departments d\nWHERE e.department = d.name;` },
    ]
  },

  // ── Subquery Lessons (28-29) ──────────────────────────────
  { id:28, cat:'Subqueries', title:'Scalar & IN Subqueries', subtitle:'Use query results as values and filters',
    sections:[
      { heading:'What is it?', body:'<p>A subquery is a SELECT inside another SELECT. Scalar subqueries return one value. <code>IN</code> subqueries return a list for membership testing.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports scalar subqueries in SELECT and WHERE, <code>IN (subquery)</code>, <code>NOT IN (subquery)</code>, and derived tables (subqueries in FROM).</p>' },
      { heading:'Key takeaways', body:'<ul><li>Scalar subqueries must return exactly one value</li><li><code>IN (subquery)</code> checks membership in a dynamic list</li><li>NOT IN can be tricky with NULLs</li></ul>' },
    ],
    examples:[
      { title:'Scalar subquery', explain:'Use a subquery result as a column value',
        sql:`SELECT name, salary,\n       (SELECT AVG(salary) FROM employees) AS company_avg\nFROM employees WHERE id <= 5;` },
      { title:'IN subquery', explain:'Filter rows where a value exists in a subquery',
        sql:`SELECT name FROM employees\nWHERE id IN (SELECT employee_id FROM project_assignments WHERE role = 'lead');` },
      { title:'NOT IN subquery', explain:'Exclude rows matching a subquery result',
        sql:`SELECT name FROM employees\nWHERE id NOT IN (SELECT DISTINCT employee_id FROM project_assignments);` },
      { title:'Comparison subquery', explain:'Compare against a subquery result',
        sql:`SELECT name, salary FROM employees\nWHERE salary > (SELECT AVG(salary) FROM employees);` },
    ]
  },
  { id:29, cat:'Subqueries', title:'EXISTS & Correlated Subqueries', subtitle:'Test for existence and row-by-row subqueries',
    sections:[
      { heading:'What is it?', body:'<p><code>EXISTS</code> returns TRUE if a subquery produces any rows. Correlated subqueries reference the outer query and are re-evaluated for each outer row.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>EXISTS</code>, <code>NOT EXISTS</code>, correlated subqueries, and derived tables (subqueries in FROM as inline views).</p>' },
      { heading:'Key takeaways', body:'<ul><li>EXISTS checks "is there at least one matching row?"</li><li>Correlated subqueries reference outer columns</li><li>EXISTS often outperforms IN for large datasets</li></ul>' },
    ],
    examples:[
      { title:'EXISTS', explain:'Check if related rows exist',
        sql:`SELECT name FROM employees e\nWHERE EXISTS (SELECT 1 FROM project_assignments pa WHERE pa.employee_id = e.id AND pa.role = 'lead');` },
      { title:'NOT EXISTS', explain:'Find rows with no matching related data',
        sql:`SELECT name FROM employees e\nWHERE NOT EXISTS (SELECT 1 FROM project_assignments pa WHERE pa.employee_id = e.id);` },
      { title:'Derived table', explain:'Use a subquery as an inline view in FROM',
        sql:`SELECT t.department, t.avg_sal\nFROM (SELECT department, AVG(salary) AS avg_sal FROM employees GROUP BY department) t\nWHERE t.avg_sal > 85000.0\nORDER BY t.avg_sal DESC;` },
      { title:'Correlated subquery', explain:'A subquery that references the outer row',
        sql:`SELECT name, salary,\n       (SELECT COUNT(*) FROM project_assignments pa WHERE pa.employee_id = e.id) AS proj_count\nFROM employees e\nORDER BY proj_count DESC;` },
    ]
  },

  // ── CTE Lessons (30-31) ───────────────────────────────────
  { id:30, cat:'CTEs', title:'Common Table Expressions (WITH)', subtitle:'Name and reuse subqueries for cleaner SQL',
    sections:[
      { heading:'What is it?', body:'<p>CTEs define temporary named result sets using <code>WITH</code>. They make complex queries readable by breaking them into named steps.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports single CTEs, multiple chained CTEs, and CTEs with aggregation. Each CTE name acts like a temporary table.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>WITH name AS (SELECT ...)</code> defines a CTE</li><li>Multiple CTEs are comma-separated</li><li>CTEs exist only during query execution</li></ul>' },
    ],
    examples:[
      { title:'Simple CTE', explain:'Define a named result set and query it',
        sql:`WITH high_earners AS (\n    SELECT id, name, salary FROM employees WHERE salary > 90000.0\n)\nSELECT name, salary FROM high_earners ORDER BY salary DESC;` },
      { title:'Multiple CTEs', explain:'Chain multiple CTEs together',
        sql:`WITH eng AS (\n    SELECT id, name, salary FROM employees WHERE department = 'Engineering'\n),\neng_projects AS (\n    SELECT pa.employee_id, p.name AS project\n    FROM project_assignments pa\n    JOIN projects p ON pa.project_id = p.id\n)\nSELECT e.name, ep.project\nFROM eng e\nJOIN eng_projects ep ON e.id = ep.employee_id;` },
      { title:'CTE with aggregation', explain:'Use GROUP BY and aggregates inside a CTE',
        sql:`WITH dept_stats AS (\n    SELECT department, COUNT(*) AS cnt, AVG(salary) AS avg_sal\n    FROM employees\n    GROUP BY department\n)\nSELECT department, cnt, ROUND(avg_sal, 2) AS avg_sal\nFROM dept_stats\nWHERE cnt >= 2\nORDER BY avg_sal DESC;` },
    ]
  },
  { id:31, cat:'CTEs', title:'Recursive CTEs', subtitle:'Traverse hierarchical and tree-structured data',
    sections:[
      { heading:'What is it?', body:'<p>A recursive CTE references itself via <code>UNION ALL</code> to traverse hierarchical data like org charts, category trees, or bill-of-materials.</p>' },
      { heading:'How TrioDB does it', body:'<p>TrioDB supports <code>WITH RECURSIVE</code> with <code>UNION ALL</code>. The recursive member JOINs the CTE name to traverse parent-child relationships.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Anchor = the starting point (e.g., WHERE parent_id IS NULL)</li><li>Recursive step = JOIN back to the CTE</li><li>Always add a depth column for debugging</li></ul>' },
    ],
    examples:[
      { title:'Category tree', explain:'Traverse a parent-child hierarchy with depth tracking',
        sql:`WITH RECURSIVE cat_tree AS (\n    SELECT id, name, parent_id, 0 AS depth\n    FROM categories\n    WHERE parent_id IS NULL\n    UNION ALL\n    SELECT c.id, c.name, c.parent_id, ct.depth + 1\n    FROM categories c\n    JOIN cat_tree ct ON c.parent_id = ct.id\n)\nSELECT id, name, depth FROM cat_tree ORDER BY depth, name;` },
    ]
  },

  // ── Window Function Lessons (32-33) ───────────────────────
  { id:32, cat:'WindowFn', title:'ROW_NUMBER, RANK & DENSE_RANK', subtitle:'Number and rank rows within result sets',
    sections:[
      { heading:'What is it?', body:'<p>Window functions compute a value for each row based on a "window" of related rows, without collapsing the result set. ROW_NUMBER assigns sequential numbers; RANK and DENSE_RANK handle ties differently.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>ROW_NUMBER()</code> assigns unique numbers. <code>RANK()</code> gives ties the same number and skips (1,1,3). <code>DENSE_RANK()</code> doesn\'t skip (1,1,2). <code>NTILE(n)</code> divides rows into n buckets.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Window functions don\'t collapse rows</li><li><code>PARTITION BY</code> creates independent groups</li><li>RANK has gaps after ties, DENSE_RANK does not</li></ul>' },
    ],
    examples:[
      { title:'ROW_NUMBER', explain:'Assign sequential numbers ordered by salary',
        sql:`SELECT name, department, salary,\n       ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank\nFROM employees;` },
      { title:'PARTITION BY', explain:'Number rows within each department independently',
        sql:`SELECT name, department, salary,\n       ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank\nFROM employees;` },
      { title:'RANK vs DENSE_RANK', explain:'Handle ties with or without gaps',
        sql:`SELECT name, salary,\n       RANK() OVER (ORDER BY salary DESC) AS rank,\n       DENSE_RANK() OVER (ORDER BY salary DESC) AS drank\nFROM employees;` },
      { title:'NTILE', explain:'Distribute rows into N equal buckets',
        sql:`SELECT name, salary,\n       NTILE(3) OVER (ORDER BY salary DESC) AS tercile\nFROM employees;` },
    ]
  },
  { id:33, cat:'WindowFn', title:'LAG, LEAD & Frame Clauses', subtitle:'Access adjacent rows and define sliding windows',
    sections:[
      { heading:'What is it?', body:'<p><code>LAG</code> and <code>LEAD</code> access values from previous/next rows. Frame clauses (<code>ROWS BETWEEN</code>) define sliding windows for running totals and moving averages.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>LAG(col, offset, default)</code> looks backward. <code>LEAD</code> looks forward. SUM/AVG with <code>ROWS BETWEEN</code> creates running totals and moving averages.</p>' },
      { heading:'Key takeaways', body:'<ul><li><code>LAG(col, 1)</code> = previous row\'s value</li><li>Provide a default (3rd arg) to handle edges</li><li><code>ROWS BETWEEN</code> defines sliding windows for aggregates</li></ul>' },
    ],
    examples:[
      { title:'LAG & LEAD', explain:'Access the previous and next row values',
        sql:`SELECT name, salary,\n       LAG(salary, 1) OVER (ORDER BY salary) AS prev_salary,\n       LEAD(salary, 1) OVER (ORDER BY salary) AS next_salary\nFROM employees;` },
      { title:'Running total', explain:'SUM with OVER for cumulative sums',
        sql:`SELECT name, salary,\n       SUM(salary) OVER (ORDER BY salary) AS running_total\nFROM employees;` },
      { title:'Moving average', explain:'AVG over a sliding window of adjacent rows',
        sql:`SELECT name, salary,\n       AVG(salary) OVER (ORDER BY salary ROWS BETWEEN 1 PRECEDING AND 1 FOLLOWING) AS moving_avg\nFROM employees;` },
      { title:'FIRST_VALUE', explain:'Get the top earner in each department',
        sql:`SELECT name, department, salary,\n       FIRST_VALUE(name) OVER (PARTITION BY department ORDER BY salary DESC) AS top_earner\nFROM employees;` },
    ]
  },

  // ── Graph Lessons (34-36) ─────────────────────────────────
  { id:34, cat:'Graph', title:'Graph Queries (MATCH)', subtitle:'Traverse relationships with graph pattern matching',
    sections:[
      { heading:'What is it?', body:'<p>TrioDB is a multi-model database \u2014 it supports graph queries alongside SQL. <code>MATCH</code> lets you express relationship patterns using an intuitive arrow syntax.</p>' },
      { heading:'How TrioDB does it', body:'<p>Patterns use <code>(node)-[:LABEL]->(node)</code> syntax. Outgoing (<code>-></code>), incoming (<code><-</code>), and bidirectional (<code>-[]-</code>) edges. Variable-length paths (<code>*N..M</code>) traverse multiple hops.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Graph indexes must exist before MATCH works</li><li>Edge labels are prefixed with colon (<code>:HAS_SKILL</code>)</li><li>Edge variables let you access edge properties</li><li><code>OPTIONAL MATCH</code> works like LEFT JOIN for graphs</li></ul>' },
    ],
    examples:[
      { title:'Outgoing edge', explain:'Find skills of an employee',
        sql:`SELECT e.name, s.name AS skill\nFROM employees e, skills s\nMATCH (e)-[:HAS_SKILL]->(s)\nWHERE e.id = 1;` },
      { title:'Edge properties', explain:'Access properties on relationships',
        sql:`SELECT e2.name, r.since\nFROM employees e1, employees e2\nMATCH (e1)-[r:KNOWS]->(e2)\nWHERE e1.id = 1;` },
      { title:'Multi-hop', explain:'Traverse multiple edges in a chain',
        sql:`SELECT e1.name, e2.name AS mentee, s.name AS mentee_skill\nFROM employees e1, employees e2, skills s\nMATCH (e1)-[:MENTORS]->(e2)-[:HAS_SKILL]->(s)\nWHERE e1.id = 3;` },
      { title:'Variable-length path', explain:'Traverse 1 to 3 hops along edges',
        sql:`SELECT e2.name\nFROM employees e1, employees e2\nMATCH (e1)-[:REPORTS_TO*1..3]->(e2)\nWHERE e1.id = 9;` },
      { title:'Shared connections', explain:'Find nodes connected via a shared node',
        sql:`SELECT e2.name, p.name AS shared_project\nFROM employees e1, employees e2, projects p\nMATCH (e1)-[:WORKS_ON]->(p)<-[:WORKS_ON]-(e2)\nWHERE e1.id = 1 AND e2.id != 1;` },
      { title:'OPTIONAL MATCH', explain:'Like LEFT JOIN for graphs \u2014 NULLs for missing',
        sql:`SELECT e.name, m.name AS mentor\nFROM employees e, employees m\nOPTIONAL MATCH (e)<-[:MENTORS]-(m)\nWHERE e.department = 'Engineering';` },
    ]
  },
  { id:35, cat:'Graph', title:'Graph Edges & Properties', subtitle:'Create, delete, and query edges with properties',
    sections:[
      { heading:'What is it?', body:'<p>Edges are the relationships in your graph. <code>CREATE EDGE</code> links two nodes with a label and optional properties. <code>DELETE EDGE</code> removes them. Edge variables in <code>MATCH</code> let you read and filter on properties.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>CREATE EDGE :LABEL FROM table(pk) TO table(pk) SET (key = value, ...)</code> creates an edge with properties. <code>DELETE EDGE :LABEL FROM table(pk) TO table(pk)</code> removes it. In MATCH, bind an edge variable <code>[r:LABEL]</code> to access <code>r.prop</code>.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Edge properties are set at creation time with <code>SET (...)</code></li><li>Use edge variables (<code>r</code>) in MATCH to read properties</li><li>Filter on edge properties in WHERE just like columns</li><li>DELETE EDGE removes a specific edge by label and endpoints</li></ul>' },
    ],
    examples:[
      { title:'Create edge with SET', explain:'Link two nodes with properties on the relationship',
        sql:`CREATE EDGE :TEMP_REVIEW\n  FROM employees(2) TO projects(1)\n  SET (rating = 5, comment = 'Great project');\nSELECT e.name, r.rating, r.comment\nFROM employees e, projects p\nMATCH (e)-[r:TEMP_REVIEW]->(p);\nDELETE EDGE :TEMP_REVIEW FROM employees(2) TO projects(1);` },
      { title:'Query edge properties', explain:'Access relationship data via edge variables',
        sql:`SELECT e.name, s.name AS skill, r.level, r.years\nFROM employees e, skills s\nMATCH (e)-[r:HAS_SKILL]->(s)\nWHERE e.id <= 3\nORDER BY r.years DESC;` },
      { title:'Filter on edge properties', explain:'Use WHERE on edge properties to narrow results',
        sql:`SELECT e1.name, e2.name AS knows, r.context\nFROM employees e1, employees e2\nMATCH (e1)-[r:KNOWS]->(e2)\nWHERE r.context = 'conference';` },
      { title:'Delete an edge', explain:'Remove a specific relationship between two nodes',
        sql:`CREATE EDGE :TEMP_LINK FROM employees(1) TO employees(2);\nSELECT e2.name FROM employees e1, employees e2\nMATCH (e1)-[:TEMP_LINK]->(e2)\nWHERE e1.id = 1;\nDELETE EDGE :TEMP_LINK FROM employees(1) TO employees(2);\nSELECT COUNT(*) AS remaining\nFROM employees e1, employees e2\nMATCH (e1)-[:TEMP_LINK]->(e2)\nWHERE e1.id = 1;` },
      { title:'Edge properties on WORKS_ON', explain:'See roles assigned via edge properties',
        sql:`SELECT e.name, p.name AS project, r.role\nFROM employees e, projects p\nMATCH (e)-[r:WORKS_ON]->(p)\nORDER BY p.name, r.role;` },
      { title:'Mentor relationships', explain:'Query mentorship edges with their start dates',
        sql:`SELECT mentor.name AS mentor, mentee.name AS mentee,\n       r.started\nFROM employees mentor, employees mentee\nMATCH (mentor)-[r:MENTORS]->(mentee);` },
    ]
  },
  { id:36, cat:'Graph', title:'Graph Analytics', subtitle:'PageRank, shortest path, and community detection', disabled:true,
    sections:[
      { heading:'What is it?', body:'<p>Beyond traversals, TrioDB provides graph analytics: PageRank for centrality, SHORTEST_PATH for navigation, COMMUNITIES for cluster detection, and DEGREE for connectivity.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>DEGREE(node)</code>/<code>IN_DEGREE</code>/<code>OUT_DEGREE</code> count edges. <code>PAGERANK(node)</code> computes centrality. <code>COMMUNITIES(node)</code> detects clusters. <code>SHORTEST_PATH</code> finds paths.</p>' },
      { heading:'Key takeaways', body:'<ul><li>DEGREE counts connections \u2014 useful for finding hubs</li><li>PAGERANK reflects "importance" based on incoming links</li><li>COMMUNITIES groups tightly-connected nodes</li></ul>' },
    ],
    examples:[
      { title:'DEGREE', explain:'Count edges for each node',
        sql:`SELECT e.name, DEGREE(e) AS total_edges\nFROM employees e\nWHERE e.id <= 5;` },
      { title:'PAGERANK', explain:'Compute centrality scores',
        sql:`SELECT e.name, PAGERANK(e) AS pr\nFROM employees e\nORDER BY pr DESC\nLIMIT 5;` },
      { title:'COMMUNITIES', explain:'Detect clusters in the graph',
        sql:`SELECT e.name, COMMUNITIES(e) AS community\nFROM employees e;` },
      { title:'SHORTEST_PATH', explain:'Find the shortest route between two nodes',
        sql:`SELECT SHORTEST_PATH(employees(1), employees(11), 'KNOWS');` },
    ]
  },

  // ── Vector & FTS Lessons (37-38) ──────────────────────────
  { id:37, cat:'VectorFTS', title:'Vector Search & Similarity', subtitle:'Find similar items using vector embeddings',
    sections:[
      { heading:'What is it?', body:'<p>Vector search finds semantically similar items by comparing vector embeddings. Each row stores a <code>VECTOR(N)</code> column. Distance functions measure how close two vectors are.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>VECTOR_DISTANCE(v1, v2, metric)</code> computes distance using \'cosine\', \'euclidean\', or \'dotproduct\'. <code>VECTOR_DIMS(v)</code> returns dimensionality. <code>VECTOR_NORM(v)</code> returns magnitude.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Cosine distance: 0 = identical, 2 = opposite</li><li>Create a VECTOR INDEX for fast approximate search</li><li>Store embeddings from any ML model</li></ul>' },
    ],
    examples:[
      { title:'Cosine similarity', explain:'Find the most similar employees by vector embedding',
        sql:`SELECT name,\n       VECTOR_DISTANCE(bio_vec, @query_vec, 'cosine') AS dist\nFROM employees\nWHERE bio_vec IS NOT NULL\nORDER BY dist ASC\nLIMIT 5;`,
        params:{query_vec:'[0.5, 0.5, 0.5, 0.5]'} },
      { title:'Euclidean distance', explain:'Measure L2 distance between vectors',
        sql:`SELECT name,\n       VECTOR_DISTANCE(bio_vec, @query_vec, 'euclidean') AS dist\nFROM employees\nWHERE bio_vec IS NOT NULL\nORDER BY dist ASC\nLIMIT 5;`,
        params:{query_vec:'[0.5, 0.5, 0.5, 0.5]'} },
      { title:'Vector dimensions', explain:'Check the dimensionality of stored vectors',
        sql:`SELECT name, VECTOR_DIMS(bio_vec) AS dims\nFROM employees\nWHERE bio_vec IS NOT NULL;` },
      { title:'Vector norm', explain:'Get the magnitude (L2 norm) of vectors',
        sql:`SELECT name, VECTOR_NORM(bio_vec) AS norm\nFROM employees\nWHERE bio_vec IS NOT NULL;` },
    ]
  },
  { id:38, cat:'VectorFTS', title:'Full-Text Search', subtitle:'Keyword search with relevance scoring',
    sections:[
      { heading:'What is it?', body:'<p>Full-text search (FTS) finds documents containing specific words. Unlike <code>LIKE</code> which does simple pattern matching, FTS understands word boundaries and provides relevance scores.</p>' },
      { heading:'How TrioDB does it', body:'<p>Create a <code>TEXT INDEX</code> on a column. <code>TEXT_MATCH(col, query)</code> returns TRUE for matches. <code>TEXT_SCORE(col, query)</code> returns a relevance score for ranking.</p>' },
      { heading:'Key takeaways', body:'<ul><li>TEXT INDEX must be created first</li><li><code>TEXT_MATCH</code> is for filtering (use in WHERE)</li><li><code>TEXT_SCORE</code> is for ranking (use in SELECT + ORDER BY)</li></ul>' },
    ],
    examples:[
      { title:'TEXT_MATCH', explain:'Find rows matching search terms',
        sql:`SELECT name FROM employees\nWHERE TEXT_MATCH(bio, 'kubernetes distributed');` },
      { title:'TEXT_SCORE', explain:'Rank results by relevance score',
        sql:`SELECT name, TEXT_SCORE(bio, 'machine learning NLP') AS relevance\nFROM employees\nWHERE TEXT_MATCH(bio, 'machine learning NLP')\nORDER BY relevance DESC;` },
    ]
  },

  // ── Meta Lesson (39) ──────────────────────────────────────
  { id:39, cat:'Meta', title:'EXPLAIN, PRAGMA & Transactions', subtitle:'Inspect, configure, and control the database',
    sections:[
      { heading:'What is it?', body:'<p>Meta commands let you look under the hood. <code>EXPLAIN</code> shows query plans. <code>PRAGMA</code> inspects configuration. <code>BEGIN</code>/<code>COMMIT</code>/<code>ROLLBACK</code> manage transactions.</p>' },
      { heading:'How TrioDB does it', body:'<p><code>EXPLAIN</code> shows the execution plan. <code>PRAGMA STATS</code> shows database statistics. Transactions ensure atomicity. <code>VACUUM</code> and <code>REINDEX</code> perform maintenance.</p>' },
      { heading:'Key takeaways', body:'<ul><li>Use EXPLAIN to optimize slow queries</li><li>Wrap related changes in BEGIN/COMMIT</li><li>ROLLBACK is your safety net</li><li>VACUUM reclaims space after bulk deletes</li></ul>' },
    ],
    examples:[
      { title:'EXPLAIN', explain:'See how the database plans to execute a query',
        sql:`EXPLAIN SELECT name, salary FROM employees WHERE department = 'Engineering';` },
      { title:'PRAGMA', explain:'Show database statistics',
        sql:`PRAGMA STATS;` },
      { title:'Transactions', explain:'BEGIN, COMMIT, and ROLLBACK for atomic changes',
        sql:`BEGIN;\nSELECT COUNT(*) AS before_count FROM employees;\nCOMMIT;\nSELECT 'Transaction committed' AS result;` },
      { title:'VACUUM & REINDEX', explain:'Database maintenance operations',
        sql:`VACUUM;\nREINDEX idx_emp_dept;` },
      { title:'Literal SELECT', explain:'SELECT without FROM returns computed values',
        sql:`SELECT 1 + 2 AS three;\nSELECT 'hello' AS greeting;` },
    ]
  },
];

// ============================================================
// Schema SQL (from 02-Schema.md)
// ============================================================
const SCHEMA_SQL = `
CREATE TABLE employees (
    id          INT PRIMARY KEY,
    name        TEXT NOT NULL,
    email       TEXT UNIQUE,
    department  TEXT NOT NULL,
    salary      FLOAT NOT NULL,
    bonus       DOUBLE,
    is_active   BOOL DEFAULT TRUE,
    hire_date   BIGINT,
    notes       BLOB,
    bio         TEXT,
    bio_vec     VECTOR(4),
    rating      INT
);
CREATE TABLE project_assignments (
    employee_id INT NOT NULL,
    project_id  INT NOT NULL,
    role        TEXT DEFAULT 'member',
    hours       FLOAT NOT NULL,
    start_date  BIGINT,
    PRIMARY KEY (employee_id, project_id),
    UNIQUE (employee_id, project_id)
);
CREATE TABLE IF NOT EXISTS departments (
    id          INT PRIMARY KEY,
    name        TEXT NOT NULL UNIQUE,
    budget      DOUBLE,
    parent_id   INT
);
CREATE TABLE projects (
    id          INT PRIMARY KEY,
    name        TEXT NOT NULL,
    dept_id     INT NOT NULL,
    status      TEXT DEFAULT 'active',
    budget      FLOAT,
    description TEXT,
    desc_vec    VECTOR(4),
    start_date  BIGINT,
    end_date    BIGINT
);
CREATE TABLE skills (
    id          INT PRIMARY KEY,
    name        TEXT NOT NULL,
    category    TEXT NOT NULL,
    difficulty  INT DEFAULT 1,
    skill_vec   VECTOR(4)
);
CREATE TABLE invoices (
    id          INT PRIMARY KEY,
    project_id  INT NOT NULL,
    amount      FLOAT NOT NULL,
    status      TEXT DEFAULT 'pending',
    due_date    BIGINT,
    notes       TEXT
);
CREATE TABLE audit_log (
    id          INT PRIMARY KEY,
    table_name  TEXT NOT NULL,
    action      TEXT NOT NULL,
    record_id   INT,
    timestamp   BIGINT,
    details     TEXT
);
CREATE TABLE categories (
    id          INT PRIMARY KEY,
    name        TEXT NOT NULL,
    parent_id   INT
);
CREATE TABLE sales (
    id          INT PRIMARY KEY,
    category_id INT NOT NULL,
    amount      FLOAT NOT NULL,
    quantity    INT NOT NULL,
    sale_date   BIGINT
);
INSERT INTO departments VALUES (1, 'Engineering', 500000.00, NULL);
INSERT INTO departments VALUES (2, 'Data Science', 350000.00, NULL);
INSERT INTO departments VALUES (3, 'Design', 200000.00, NULL);
INSERT INTO departments VALUES (4, 'Sales', 300000.00, NULL);
INSERT INTO departments VALUES (5, 'ML Platform', 150000.00, 2);
INSERT INTO employees VALUES (1, 'Marco Rossi', 'marco@co.com', 'Engineering', 95000.0, 5000.0, TRUE, 1609459200000, NULL, 'Backend engineer expert in Go and distributed systems', NULL, NULL);
INSERT INTO employees VALUES (2, 'Lena Kowalski', 'lena@co.com', 'Engineering', 88000.0, 3000.0, TRUE, 1625097600000, NULL, 'Full-stack developer specializing in React and Node.js', NULL, NULL);
INSERT INTO employees VALUES (3, 'James Okafor', 'james@co.com', 'Data Science', 102000.0, 7000.0, TRUE, 1617235200000, NULL, 'ML engineer focused on NLP and transformer models', NULL, NULL);
INSERT INTO employees VALUES (4, 'Priya Sharma', 'priya@co.com', 'Data Science', 98000.0, 4000.0, TRUE, 1633046400000, NULL, 'Data engineer building streaming pipelines with Kafka', NULL, NULL);
INSERT INTO employees VALUES (5, 'Sofia Lindgren', 'sofia@co.com', 'Design', 85000.0, 2000.0, TRUE, 1640995200000, NULL, 'UX designer focused on enterprise dashboard design', NULL, NULL);
INSERT INTO employees VALUES (6, 'Miguel Santos', 'miguel@co.com', 'Sales', 78000.0, 8000.0, TRUE, 1648771200000, NULL, 'Account executive for enterprise clients in finance', NULL, NULL);
INSERT INTO employees VALUES (7, 'Nadia Petrov', 'nadia@co.com', 'Engineering', 91000.0, NULL, TRUE, 1656633600000, NULL, 'DevOps engineer specializing in Kubernetes and CI/CD', NULL, NULL);
INSERT INTO employees VALUES (8, 'Thomas Brennan', 'thomas@co.com', 'Data Science', 105000.0, 6000.0, FALSE, 1580515200000, NULL, 'Senior ML researcher in computer vision and edge AI', NULL, NULL);
INSERT INTO employees VALUES (9, 'Yuki Tanaka', 'yuki@co.com', 'Engineering', 72000.0, 1000.0, TRUE, 1672531200000, NULL, 'Junior developer learning microservices and cloud', NULL, NULL);
INSERT INTO employees VALUES (10, 'Omar Hadid', 'omar@co.com', 'Sales', 82000.0, 10000.0, TRUE, 1664582400000, NULL, 'Sales manager leading EMEA region expansion', NULL, NULL);
INSERT INTO employees (id, name, email, department, salary, is_active, bio) VALUES (11, 'Elsa Johansson', 'elsa@co.com', 'ML Platform', 97000.0, TRUE, 'MLOps engineer deploying models at scale');
INSERT INTO employees (id, name, email, department, salary, is_active, bio) VALUES (12, 'Ravi Mehta', 'ravi@co.com', 'Design', 79000.0, TRUE, 'Visual designer creating data visualization systems');
INSERT INTO projects VALUES (1, 'Trading Platform', 1, 'active', 500000.0, 'Cloud-native trading engine migration', NULL, 1704067200000, 1735689600000), (2, 'Patient AI', 2, 'active', 300000.0, 'NLP-powered patient records system', NULL, 1706745600000, 1767225600000), (3, 'Smart Grid', 1, 'active', 200000.0, 'Real-time energy grid analytics', NULL, 1710979200000, 1735689600000), (4, 'Mobile App', 3, 'completed', 150000.0, 'Cross-platform banking application', NULL, 1672531200000, 1703980800000), (5, 'Data Lake', 2, 'active', 400000.0, 'Petabyte-scale analytics platform', NULL, 1714521600000, 1767225600000), (6, 'Sales Portal', 4, 'proposal', 80000.0, 'Internal sales dashboard and CRM', NULL, NULL, NULL);
INSERT INTO skills VALUES (1, 'Python', 'programming', 2, NULL), (2, 'Go', 'programming', 3, NULL), (3, 'TypeScript', 'programming', 2, NULL), (4, 'Machine Learning', 'data', 4, NULL), (5, 'Deep Learning', 'data', 5, NULL), (6, 'Kubernetes', 'framework', 3, NULL), (7, 'React', 'framework', 2, NULL), (8, 'SQL', 'programming', 1, NULL), (9, 'NLP', 'data', 4, NULL), (10, 'UX Design', 'soft_skill', 2, NULL);
INSERT INTO project_assignments VALUES (1, 1, 'lead', 160.0, 1704067200000), (2, 1, 'developer', 120.0, 1704067200000), (7, 1, 'devops', 80.0, 1706745600000), (3, 2, 'lead', 140.0, 1706745600000), (4, 2, 'engineer', 100.0, 1706745600000), (11, 2, 'mlops', 60.0, 1710979200000), (5, 4, 'designer', 90.0, 1672531200000), (12, 4, 'designer', 70.0, 1672531200000), (1, 3, 'engineer', 40.0, 1710979200000), (4, 5, 'lead', 150.0, 1714521600000), (8, 5, 'researcher', 0.0, 1714521600000), (6, 6, 'lead', 20.0, NULL), (10, 6, 'manager', 10.0, NULL);
INSERT INTO invoices VALUES (1, 1, 125000.00, 'paid', 1706745600000, 'Q1 milestone'), (2, 1, 140000.00, 'paid', 1709424000000, 'Q1 prototype'), (3, 1, 100000.00, 'pending', 1712016000000, NULL), (4, 2, 95000.00, 'paid', 1709424000000, 'NLP pipeline'), (5, 2, 88000.00, 'overdue', 1712016000000, 'Coding model'), (6, 3, 55000.00, 'paid', 1714694400000, NULL), (7, 4, 150000.00, 'paid', 1703980800000, 'Final delivery'), (8, 5, 80000.00, 'pending', 1717286400000, 'Phase 1'), (9, 5, 120000.00, 'overdue', 1719878400000, 'Phase 2');
INSERT INTO categories VALUES (1, 'All Products', NULL);
INSERT INTO categories VALUES (2, 'Electronics', 1);
INSERT INTO categories VALUES (3, 'Clothing', 1);
INSERT INTO categories VALUES (4, 'Laptops', 2);
INSERT INTO categories VALUES (5, 'Phones', 2);
INSERT INTO categories VALUES (6, 'T-Shirts', 3);
INSERT INTO categories VALUES (7, 'Gaming Laptops', 4);
INSERT INTO sales VALUES (1, 4, 1200.0, 5, 1704067200000), (2, 4, 1500.0, 3, 1706745600000), (3, 5, 800.0, 10, 1704067200000), (4, 5, 900.0, 8, 1709424000000), (5, 6, 25.0, 100, 1704067200000), (6, 7, 2500.0, 2, 1712016000000), (7, 6, 30.0, 50, 1714694400000), (8, 4, 1100.0, 7, 1714694400000);
INSERT INTO audit_log VALUES (1, 'employees', 'INSERT', 1, 1704067200000, 'Created Marco Rossi'), (2, 'employees', 'UPDATE', 1, 1706745600000, 'Salary adjustment'), (3, 'projects', 'INSERT', 1, 1704067200000, 'Trading Platform created'), (4, 'employees', 'INSERT', 9, 1672531200000, 'Created Yuki Tanaka'), (5, 'projects', 'UPDATE', 4, 1703980800000, 'Mobile App completed');
INSERT INTO employees (id, name, email, department, salary) VALUES (1, 'Marco Rossi', 'marco.rossi@co.com', 'Engineering', 98000.0) ON CONFLICT (id) DO UPDATE SET salary = 98000.0, email = 'marco.rossi@co.com';
INSERT INTO departments (id, name, budget) VALUES (1, 'Engineering', 550000.0) ON CONFLICT (id) DO NOTHING;
UPDATE employees SET salary = 98000.0 WHERE id = 1;
UPDATE employees SET salary = 90000.0, bonus = 3500.0 WHERE id = 2;
UPDATE employees SET salary = salary * 1.05 WHERE department = 'Engineering';
UPDATE projects SET status = status;
DELETE FROM audit_log WHERE id = 5;
CREATE INDEX idx_emp_dept ON employees (department);
CREATE BTREE INDEX idx_emp_salary ON employees (salary);
CREATE VECTOR INDEX idx_emp_bio ON employees (bio_vec) WITH (metric = 'cosine', m = '16', ef_construction = '200');
CREATE TEXT INDEX idx_emp_biotext ON employees (bio);
CREATE INDEX IF NOT EXISTS idx_emp_dept ON employees (department);
CREATE GRAPH INDEX idx_graph_emp ON employees (id);
CREATE GRAPH INDEX idx_graph_skills ON skills (id);
CREATE GRAPH INDEX idx_graph_projects ON projects (id);
CREATE GRAPH INDEX idx_graph_depts ON departments (id);
CREATE EDGE :MANAGES FROM departments(1) TO employees(1);
CREATE EDGE :MANAGES FROM departments(1) TO employees(2);
CREATE EDGE :MANAGES FROM departments(1) TO employees(7);
CREATE EDGE :MANAGES FROM departments(1) TO employees(9);
CREATE EDGE :MANAGES FROM departments(2) TO employees(3);
CREATE EDGE :MANAGES FROM departments(2) TO employees(4);
CREATE EDGE :MANAGES FROM departments(2) TO employees(8);
CREATE EDGE :MANAGES FROM departments(3) TO employees(5);
CREATE EDGE :MANAGES FROM departments(3) TO employees(12);
CREATE EDGE :MANAGES FROM departments(4) TO employees(6);
CREATE EDGE :MANAGES FROM departments(4) TO employees(10);
CREATE EDGE :MANAGES FROM departments(5) TO employees(11);
CREATE EDGE :REPORTS_TO FROM employees(2) TO employees(1) SET (since = '2021-07');
CREATE EDGE :REPORTS_TO FROM employees(7) TO employees(1) SET (since = '2022-07');
CREATE EDGE :REPORTS_TO FROM employees(9) TO employees(1) SET (since = '2023-01');
CREATE EDGE :REPORTS_TO FROM employees(4) TO employees(3) SET (since = '2022-01');
CREATE EDGE :REPORTS_TO FROM employees(11) TO employees(3) SET (since = '2023-10');
CREATE EDGE :KNOWS FROM employees(1) TO employees(3) SET (since = '2020-01', context = 'conference');
CREATE EDGE :KNOWS FROM employees(3) TO employees(1) SET (since = '2020-01', context = 'conference');
CREATE EDGE :KNOWS FROM employees(1) TO employees(7) SET (since = '2022-06', context = 'KubeCon');
CREATE EDGE :KNOWS FROM employees(2) TO employees(5) SET (since = '2021-09', context = 'hackathon');
CREATE EDGE :KNOWS FROM employees(3) TO employees(4) SET (since = '2022-03', context = 'ML reading group');
CREATE EDGE :KNOWS FROM employees(4) TO employees(11) SET (since = '2023-06', context = 'MLOps meetup');
CREATE EDGE :KNOWS FROM employees(6) TO employees(10) SET (since = '2022-08', context = 'sales kickoff');
CREATE EDGE :MENTORS FROM employees(1) TO employees(9) SET (started = '2023-01');
CREATE EDGE :MENTORS FROM employees(3) TO employees(4) SET (started = '2022-06');
CREATE EDGE :MENTORS FROM employees(3) TO employees(11) SET (started = '2023-10');
CREATE EDGE :HAS_SKILL FROM employees(1) TO skills(2) SET (level = 'expert', years = 8);
CREATE EDGE :HAS_SKILL FROM employees(1) TO skills(6) SET (level = 'advanced', years = 5);
CREATE EDGE :HAS_SKILL FROM employees(1) TO skills(8) SET (level = 'expert', years = 10);
CREATE EDGE :HAS_SKILL FROM employees(2) TO skills(3) SET (level = 'expert', years = 6);
CREATE EDGE :HAS_SKILL FROM employees(2) TO skills(7) SET (level = 'expert', years = 5);
CREATE EDGE :HAS_SKILL FROM employees(3) TO skills(1) SET (level = 'expert', years = 9);
CREATE EDGE :HAS_SKILL FROM employees(3) TO skills(4) SET (level = 'expert', years = 7);
CREATE EDGE :HAS_SKILL FROM employees(3) TO skills(5) SET (level = 'advanced', years = 5);
CREATE EDGE :HAS_SKILL FROM employees(3) TO skills(9) SET (level = 'expert', years = 6);
CREATE EDGE :HAS_SKILL FROM employees(4) TO skills(1) SET (level = 'advanced', years = 5);
CREATE EDGE :HAS_SKILL FROM employees(4) TO skills(4) SET (level = 'advanced', years = 4);
CREATE EDGE :HAS_SKILL FROM employees(5) TO skills(10) SET (level = 'expert', years = 6);
CREATE EDGE :HAS_SKILL FROM employees(6) TO skills(8) SET (level = 'intermediate', years = 2);
CREATE EDGE :HAS_SKILL FROM employees(7) TO skills(6) SET (level = 'expert', years = 4);
CREATE EDGE :HAS_SKILL FROM employees(7) TO skills(2) SET (level = 'advanced', years = 3);
CREATE EDGE :HAS_SKILL FROM employees(8) TO skills(5) SET (level = 'expert', years = 8);
CREATE EDGE :HAS_SKILL FROM employees(8) TO skills(1) SET (level = 'expert', years = 10);
CREATE EDGE :HAS_SKILL FROM employees(9) TO skills(1) SET (level = 'beginner', years = 1);
CREATE EDGE :HAS_SKILL FROM employees(11) TO skills(4) SET (level = 'advanced', years = 3);
CREATE EDGE :HAS_SKILL FROM employees(11) TO skills(6) SET (level = 'intermediate', years = 2);
CREATE EDGE :WORKS_ON FROM employees(1) TO projects(1) SET (role = 'lead');
CREATE EDGE :WORKS_ON FROM employees(2) TO projects(1) SET (role = 'developer');
CREATE EDGE :WORKS_ON FROM employees(7) TO projects(1) SET (role = 'devops');
CREATE EDGE :WORKS_ON FROM employees(3) TO projects(2) SET (role = 'lead');
CREATE EDGE :WORKS_ON FROM employees(4) TO projects(2) SET (role = 'engineer');
CREATE EDGE :WORKS_ON FROM employees(11) TO projects(2) SET (role = 'mlops');
CREATE EDGE :WORKS_ON FROM employees(1) TO projects(3) SET (role = 'engineer');
CREATE EDGE :WORKS_ON FROM employees(4) TO projects(5) SET (role = 'lead');
CREATE EDGE :WORKS_ON FROM employees(8) TO projects(5) SET (role = 'researcher');
CREATE EDGE :WORKS_ON FROM employees(5) TO projects(4) SET (role = 'designer');
CREATE EDGE :WORKS_ON FROM employees(12) TO projects(4) SET (role = 'designer');
CREATE EDGE :REQUIRES FROM skills(5) TO skills(4);
CREATE EDGE :REQUIRES FROM skills(9) TO skills(4);
CREATE EDGE :REQUIRES FROM skills(4) TO skills(1);
CREATE EDGE :REQUIRES FROM skills(7) TO skills(3);
CREATE EDGE :PARENT_OF FROM skills(4) TO skills(5);
CREATE EDGE :PARENT_OF FROM skills(4) TO skills(9);
CREATE EDGE :RELATED_TO FROM skills(5) TO skills(9);
CREATE EDGE :RELATED_TO FROM skills(9) TO skills(5);
CREATE EDGE :RELATED_TO FROM skills(2) TO skills(6);
CREATE EDGE :TEMP_LINK FROM employees(1) TO employees(2);
DELETE EDGE :TEMP_LINK FROM employees(1) TO employees(2);
`;

// Bio vectors to set up after schema (requires params API)
const BIO_VECS = {
  1: '[0.8, 0.2, 0.9, 0.1]',
  2: '[0.7, 0.3, 0.8, 0.2]',
  3: '[0.3, 0.9, 0.4, 0.8]',
  4: '[0.4, 0.8, 0.3, 0.7]',
  5: '[0.1, 0.5, 0.2, 0.6]',
  6: '[0.6, 0.1, 0.7, 0.3]',
  7: '[0.9, 0.4, 0.8, 0.1]',
  8: '[0.2, 0.9, 0.5, 0.9]',
  9: '[0.5, 0.3, 0.6, 0.2]',
  10: '[0.7, 0.2, 0.4, 0.5]',
  11: '[0.3, 0.8, 0.5, 0.7]',
  12: '[0.2, 0.6, 0.3, 0.4]',
};

// ============================================================
// Function Reference for Monaco sidebar
// ============================================================
const FUNCTIONS = [
  // String
  { cat:'String', name:'LENGTH', sig:'(str TEXT) → INT', desc:'Returns the number of characters in the string.', ex:"SELECT LENGTH(name) FROM employees WHERE id = 1;" },
  { cat:'String', name:'UPPER', sig:'(str TEXT) → TEXT', desc:'Converts all characters to uppercase.', ex:"SELECT UPPER(name) FROM employees LIMIT 3;" },
  { cat:'String', name:'LOWER', sig:'(str TEXT) → TEXT', desc:'Converts all characters to lowercase.', ex:"SELECT LOWER(email) FROM employees LIMIT 3;" },
  { cat:'String', name:'TRIM', sig:'(str TEXT) → TEXT', desc:'Removes leading and trailing whitespace from the string.', ex:"SELECT TRIM('  hello  ');" },
  { cat:'String', name:'LTRIM', sig:'(str TEXT) → TEXT', desc:'Removes leading whitespace (left side only).', ex:"SELECT LTRIM('   hello');" },
  { cat:'String', name:'RTRIM', sig:'(str TEXT) → TEXT', desc:'Removes trailing whitespace (right side only).', ex:"SELECT RTRIM('hello   ');" },
  { cat:'String', name:'SUBSTR', sig:'(str TEXT, start INT, len INT) → TEXT', desc:'Extracts a substring starting at position (1-based) for len characters.', ex:"SELECT SUBSTR(name, 1, 3) FROM employees LIMIT 3;" },
  { cat:'String', name:'SUBSTRING', sig:'(str TEXT, start INT, len INT) → TEXT', desc:'Alias for SUBSTR. Extracts a substring starting at position (1-based).', ex:"SELECT SUBSTRING(name, 1, 5) FROM employees LIMIT 3;" },
  { cat:'String', name:'REPLACE', sig:'(str TEXT, old TEXT, new TEXT) → TEXT', desc:'Replaces all occurrences of old with new in the string.', ex:"SELECT REPLACE(email, '@co.com', '@triodb.cloud') FROM employees LIMIT 3;" },
  { cat:'String', name:'CONCAT', sig:'(a TEXT, b TEXT, ...) → TEXT', desc:'Concatenates two or more strings together.', ex:"SELECT CONCAT(name, ' <', email, '>') FROM employees LIMIT 3;" },
  { cat:'String', name:'INSTR', sig:'(str TEXT, sub TEXT) → INT', desc:'Returns the 1-based position of the first occurrence of sub in str, or 0 if not found.', ex:"SELECT name, INSTR(email, '@') AS at_pos FROM employees LIMIT 3;" },
  { cat:'String', name:'REVERSE', sig:'(str TEXT) → TEXT', desc:'Reverses the characters in the string.', ex:"SELECT REVERSE(name) FROM employees LIMIT 3;" },
  { cat:'String', name:'LEFT', sig:'(str TEXT, n INT) → TEXT', desc:'Returns the first n characters from the string.', ex:"SELECT LEFT(name, 5) FROM employees LIMIT 3;" },
  { cat:'String', name:'RIGHT', sig:'(str TEXT, n INT) → TEXT', desc:'Returns the last n characters from the string.', ex:"SELECT RIGHT(email, 6) FROM employees LIMIT 3;" },
  // Math
  { cat:'Math', name:'ABS', sig:'(n FLOAT) → FLOAT', desc:'Returns the absolute (non-negative) value.', ex:"SELECT ABS(-42.5);" },
  { cat:'Math', name:'ROUND', sig:'(n FLOAT, decimals INT) → FLOAT', desc:'Rounds n to the specified number of decimal places.', ex:"SELECT name, ROUND(salary, -3) AS rounded FROM employees LIMIT 3;" },
  { cat:'Math', name:'CEIL', sig:'(n FLOAT) → INT', desc:'Rounds up to the nearest integer (ceiling).', ex:"SELECT CEIL(4.2);" },
  { cat:'Math', name:'CEILING', sig:'(n FLOAT) → INT', desc:'Alias for CEIL. Rounds up to nearest integer.', ex:"SELECT CEILING(4.2);" },
  { cat:'Math', name:'FLOOR', sig:'(n FLOAT) → INT', desc:'Rounds down to the nearest integer (floor).', ex:"SELECT FLOOR(4.9);" },
  { cat:'Math', name:'SQRT', sig:'(n FLOAT) → FLOAT', desc:'Returns the square root of n.', ex:"SELECT SQRT(144);" },
  { cat:'Math', name:'POWER', sig:'(base FLOAT, exp FLOAT) → FLOAT', desc:'Returns base raised to the power of exp.', ex:"SELECT POWER(2, 10);" },
  { cat:'Math', name:'POW', sig:'(base FLOAT, exp FLOAT) → FLOAT', desc:'Alias for POWER.', ex:"SELECT POW(3, 3);" },
  { cat:'Math', name:'MOD', sig:'(a INT, b INT) → INT', desc:'Returns the remainder of a divided by b.', ex:"SELECT MOD(17, 5);" },
  { cat:'Math', name:'SIGN', sig:'(n FLOAT) → INT', desc:'Returns -1, 0, or 1 indicating the sign of n.', ex:"SELECT SIGN(-42), SIGN(0), SIGN(99);" },
  { cat:'Math', name:'LOG', sig:'(n FLOAT) → FLOAT', desc:'Returns the natural logarithm (base e) of n.', ex:"SELECT LOG(2.718281828);" },
  { cat:'Math', name:'LOG10', sig:'(n FLOAT) → FLOAT', desc:'Returns the base-10 logarithm of n.', ex:"SELECT LOG10(1000);" },
  { cat:'Math', name:'EXP', sig:'(n FLOAT) → FLOAT', desc:'Returns e raised to the power of n.', ex:"SELECT EXP(1);" },
  { cat:'Math', name:'PI', sig:'() → FLOAT', desc:'Returns the mathematical constant Pi.', ex:"SELECT PI();" },
  { cat:'Math', name:'RANDOM', sig:'() → FLOAT', desc:'Returns a random floating-point number between 0 and 1.', ex:"SELECT RANDOM(), RANDOM(), RANDOM();" },
  // Date/Time
  { cat:'Date/Time', name:'NOW', sig:'() → BIGINT', desc:'Returns the current timestamp as Unix epoch milliseconds.', ex:"SELECT NOW();" },
  { cat:'Date/Time', name:'DATE', sig:'(ts BIGINT) → TEXT', desc:'Extracts the date part (YYYY-MM-DD) from a Unix timestamp.', ex:"SELECT name, DATE(hire_date) FROM employees LIMIT 3;" },
  { cat:'Date/Time', name:'TIME', sig:'(ts BIGINT) → TEXT', desc:'Extracts the time part (HH:MM:SS) from a Unix timestamp.', ex:"SELECT TIME(NOW());" },
  { cat:'Date/Time', name:'YEAR', sig:'(ts BIGINT) → INT', desc:'Extracts the year from a Unix timestamp.', ex:"SELECT name, YEAR(hire_date) AS yr FROM employees LIMIT 5;" },
  { cat:'Date/Time', name:'MONTH', sig:'(ts BIGINT) → INT', desc:'Extracts the month (1-12) from a Unix timestamp.', ex:"SELECT name, MONTH(hire_date) FROM employees LIMIT 5;" },
  { cat:'Date/Time', name:'DAY', sig:'(ts BIGINT) → INT', desc:'Extracts the day of the month from a Unix timestamp.', ex:"SELECT name, DAY(hire_date) FROM employees LIMIT 5;" },
  { cat:'Date/Time', name:'HOUR', sig:'(ts BIGINT) → INT', desc:'Extracts the hour (0-23) from a Unix timestamp.', ex:"SELECT HOUR(NOW());" },
  { cat:'Date/Time', name:'MINUTE', sig:'(ts BIGINT) → INT', desc:'Extracts the minute (0-59) from a Unix timestamp.', ex:"SELECT MINUTE(NOW());" },
  { cat:'Date/Time', name:'SECOND', sig:'(ts BIGINT) → INT', desc:'Extracts the second (0-59) from a Unix timestamp.', ex:"SELECT SECOND(NOW());" },
  // Aggregate
  { cat:'Aggregate', name:'COUNT', sig:'(expr ANY) → INT', desc:'Counts the number of non-NULL values. Use COUNT(*) to count all rows.', ex:"SELECT department, COUNT(*) FROM employees GROUP BY department;" },
  { cat:'Aggregate', name:'SUM', sig:'(expr FLOAT) → FLOAT', desc:'Returns the sum of all non-NULL values in the group.', ex:"SELECT department, SUM(salary) FROM employees GROUP BY department;" },
  { cat:'Aggregate', name:'AVG', sig:'(expr FLOAT) → FLOAT', desc:'Returns the average of all non-NULL values in the group.', ex:"SELECT department, AVG(salary) FROM employees GROUP BY department;" },
  { cat:'Aggregate', name:'MIN', sig:'(expr ANY) → ANY', desc:'Returns the minimum value in the group.', ex:"SELECT MIN(salary), MAX(salary) FROM employees;" },
  { cat:'Aggregate', name:'MAX', sig:'(expr ANY) → ANY', desc:'Returns the maximum value in the group.', ex:"SELECT department, MAX(salary) FROM employees GROUP BY department;" },
  // Window
  { cat:'Window', name:'ROW_NUMBER', sig:'() → INT', desc:'Assigns a unique sequential integer to each row within its partition, starting at 1.', ex:"SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) AS rn FROM employees;" },
  { cat:'Window', name:'RANK', sig:'() → INT', desc:'Assigns a rank with gaps for ties (e.g., 1, 2, 2, 4).', ex:"SELECT name, salary, RANK() OVER (ORDER BY salary DESC) AS rnk FROM employees;" },
  { cat:'Window', name:'DENSE_RANK', sig:'() → INT', desc:'Assigns a rank without gaps (e.g., 1, 2, 2, 3).', ex:"SELECT name, salary, DENSE_RANK() OVER (ORDER BY salary DESC) AS dr FROM employees;" },
  { cat:'Window', name:'NTILE', sig:'(n INT) → INT', desc:'Distributes rows into n roughly equal-sized buckets.', ex:"SELECT name, salary, NTILE(3) OVER (ORDER BY salary DESC) AS tier FROM employees;" },
  { cat:'Window', name:'LAG', sig:'(col ANY, offset INT, default ANY) → ANY', desc:'Returns the value from a row that is offset rows before the current row.', ex:"SELECT name, salary, LAG(salary, 1, 0) OVER (ORDER BY salary) AS prev FROM employees;" },
  { cat:'Window', name:'LEAD', sig:'(col ANY, offset INT, default ANY) → ANY', desc:'Returns the value from a row that is offset rows after the current row.', ex:"SELECT name, salary, LEAD(salary, 1, 0) OVER (ORDER BY salary) AS next FROM employees;" },
  { cat:'Window', name:'FIRST_VALUE', sig:'(col ANY) → ANY', desc:'Returns the first value in the window frame.', ex:"SELECT name, salary, FIRST_VALUE(name) OVER (ORDER BY salary DESC) AS top FROM employees;" },
  { cat:'Window', name:'LAST_VALUE', sig:'(col ANY) → ANY', desc:'Returns the last value in the window frame.', ex:"SELECT name, salary, LAST_VALUE(name) OVER (ORDER BY salary DESC ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING) AS bottom FROM employees;" },
  // Vector
  { cat:'Vector', name:'VECTOR_DISTANCE', sig:'(v1 VECTOR, v2 VECTOR, metric TEXT) → FLOAT', desc:'Computes distance between two vectors. Metrics: cosine, euclidean, dotproduct.', ex:"SELECT name, VECTOR_DISTANCE(bio_vec, @v, 'cosine') AS dist FROM employees WHERE bio_vec IS NOT NULL ORDER BY dist LIMIT 3;" },
  { cat:'Vector', name:'VECTOR_DIMS', sig:'(v VECTOR) → INT', desc:'Returns the number of dimensions in the vector.', ex:"SELECT name, VECTOR_DIMS(bio_vec) FROM employees WHERE bio_vec IS NOT NULL LIMIT 3;" },
  { cat:'Vector', name:'VECTOR_NORM', sig:'(v VECTOR) → FLOAT', desc:'Returns the L2 (Euclidean) norm of the vector.', ex:"SELECT name, VECTOR_NORM(bio_vec) FROM employees WHERE bio_vec IS NOT NULL LIMIT 3;" },
  // Graph
  { cat:'Graph', name:'DEGREE', sig:'(node ROW) → INT', desc:'Returns the total number of edges (in + out) for the node.', ex:"SELECT e.name, DEGREE(e) FROM employees e WHERE e.id <= 5;" },
  { cat:'Graph', name:'IN_DEGREE', sig:'(node ROW) → INT', desc:'Returns the number of incoming edges for the node.', ex:"SELECT e.name, IN_DEGREE(e) FROM employees e WHERE e.id <= 5;" },
  { cat:'Graph', name:'OUT_DEGREE', sig:'(node ROW) → INT', desc:'Returns the number of outgoing edges for the node.', ex:"SELECT e.name, OUT_DEGREE(e) FROM employees e WHERE e.id <= 5;" },
  { cat:'Graph', name:'PAGERANK', sig:'(node ROW) → FLOAT', desc:'Computes the PageRank centrality score for the node.', ex:"SELECT e.name, PAGERANK(e) AS pr FROM employees e ORDER BY pr DESC LIMIT 5;" },
  { cat:'Graph', name:'COMMUNITIES', sig:'(node ROW) → INT', desc:'Detects the community/cluster ID the node belongs to.', ex:"SELECT e.name, COMMUNITIES(e) AS cid FROM employees e;" },
  { cat:'Graph', name:'SHORTEST_PATH', sig:'(from ROW, to ROW, label TEXT) → TEXT', desc:'Finds the shortest path between two nodes via the given edge label.', ex:"SELECT SHORTEST_PATH(employees(1), employees(11), 'KNOWS');" },
  // FTS
  { cat:'FTS', name:'TEXT_MATCH', sig:'(col TEXT, query TEXT) → BOOL', desc:'Returns true if the column matches the full-text search query.', ex:"SELECT name, bio FROM employees WHERE TEXT_MATCH(bio, 'cloud distributed');" },
  { cat:'FTS', name:'TEXT_SCORE', sig:'(col TEXT, query TEXT) → FLOAT', desc:'Returns the BM25 relevance score for the full-text search query.', ex:"SELECT name, TEXT_SCORE(bio, 'engineering') AS score FROM employees WHERE TEXT_MATCH(bio, 'engineering') ORDER BY score DESC;" },
  // Type/Utility
  { cat:'Type', name:'TYPEOF', sig:'(expr ANY) → TEXT', desc:'Returns the type name of the expression (INT, TEXT, FLOAT, etc.).', ex:"SELECT TYPEOF(42), TYPEOF('hello'), TYPEOF(3.14);" },
  { cat:'Type', name:'COALESCE', sig:'(a ANY, b ANY, ...) → ANY', desc:'Returns the first non-NULL argument. Useful for default values.', ex:"SELECT name, COALESCE(bonus, 0) AS bonus FROM employees LIMIT 5;" },
  { cat:'Type', name:'NULLIF', sig:'(a ANY, b ANY) → ANY', desc:'Returns NULL if a equals b, otherwise returns a.', ex:"SELECT NULLIF(1, 1), NULLIF(1, 2);" },
  { cat:'Type', name:'IIF', sig:'(cond BOOL, t ANY, f ANY) → ANY', desc:'Inline IF — returns t if condition is true, otherwise f.', ex:"SELECT name, IIF(salary > 90000, 'Senior', 'Standard') AS tier FROM employees;" },
  { cat:'Type', name:'IFNULL', sig:'(a ANY, b ANY) → ANY', desc:'Returns a if not NULL, otherwise returns b.', ex:"SELECT name, IFNULL(bonus, 0) FROM employees LIMIT 5;" },
  { cat:'Type', name:'CAST', sig:'(expr AS type) → type', desc:'Converts an expression to the specified type (INT, FLOAT, TEXT, BOOL, BIGINT).', ex:"SELECT CAST(salary AS INT) FROM employees LIMIT 3;" },
];

// Table schema info for DB explorer
const TABLE_SCHEMA = [
  { name:'employees', cols:[
    {n:'id',c:'INT PK'},{n:'name',c:'TEXT'},{n:'email',c:'TEXT'},{n:'department',c:'TEXT'},
    {n:'salary',c:'FLOAT'},{n:'bonus',c:'DOUBLE'},{n:'is_active',c:'BOOL'},{n:'hire_date',c:'BIGINT'},
    {n:'notes',c:'BLOB'},{n:'bio',c:'TEXT'},{n:'bio_vec',c:'VECTOR(4)'},{n:'rating',c:'INT'}
  ]},
  { name:'departments', cols:[
    {n:'id',c:'INT PK'},{n:'name',c:'TEXT'},{n:'budget',c:'DOUBLE'},{n:'parent_id',c:'INT'}
  ]},
  { name:'projects', cols:[
    {n:'id',c:'INT PK'},{n:'name',c:'TEXT'},{n:'dept_id',c:'INT'},{n:'status',c:'TEXT'},
    {n:'budget',c:'FLOAT'},{n:'description',c:'TEXT'},{n:'desc_vec',c:'VECTOR(4)'},
    {n:'start_date',c:'BIGINT'},{n:'end_date',c:'BIGINT'}
  ]},
  { name:'project_assignments', cols:[
    {n:'employee_id',c:'INT PK'},{n:'project_id',c:'INT PK'},{n:'role',c:'TEXT'},
    {n:'hours',c:'FLOAT'},{n:'start_date',c:'BIGINT'}
  ]},
  { name:'skills', cols:[
    {n:'id',c:'INT PK'},{n:'name',c:'TEXT'},{n:'category',c:'TEXT'},
    {n:'difficulty',c:'INT'},{n:'skill_vec',c:'VECTOR(4)'}
  ]},
  { name:'invoices', cols:[
    {n:'id',c:'INT PK'},{n:'project_id',c:'INT'},{n:'amount',c:'FLOAT'},
    {n:'status',c:'TEXT'},{n:'due_date',c:'BIGINT'},{n:'notes',c:'TEXT'}
  ]},
  { name:'audit_log', cols:[
    {n:'id',c:'INT PK'},{n:'table_name',c:'TEXT'},{n:'action',c:'TEXT'},
    {n:'record_id',c:'INT'},{n:'timestamp',c:'BIGINT'},{n:'details',c:'TEXT'}
  ]},
  { name:'categories', cols:[
    {n:'id',c:'INT PK'},{n:'name',c:'TEXT'},{n:'parent_id',c:'INT'}
  ]},
  { name:'sales', cols:[
    {n:'id',c:'INT PK'},{n:'category_id',c:'INT'},{n:'amount',c:'FLOAT'},
    {n:'quantity',c:'INT'},{n:'sale_date',c:'BIGINT'}
  ]},
];
