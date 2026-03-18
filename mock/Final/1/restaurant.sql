CREATE TABLE IF NOT EXISTS restaurants (
    product_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    price REAL NOT NULL,
    image_url TEXT NOT NULL
);

INSERT INTO restaurants (product_id, name, description, price, image_url) VALUES 
(101, 'Salmon Aburi Roll', 'ซูชิโรลแซลมอนเบิร์นไฟ ท็อปด้วยไข่กุ้งและซอสสไปซี่สูตรพิเศษ', 320.0, 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&w=800'),
(102, 'Truffle Beef Burger', 'เบอร์เกอร์เนื้อวากิวฉ่ำๆ พร้อมซอสเห็ดทรัฟเฟิลหอมละมุนและชีสสวิส', 450.0, 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800'),
(103, 'Spicy Seafood Spaghetti', 'สปาเก็ตตี้ขี้เมาทะเล รสชาติจัดจ้านสไตล์ไทย เครื่องแน่นทั้งกุ้งและปลาหมึก', 280.0, 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800'),
(104, 'Premium Ribeye Steak', 'สเต็กเนื้อริบอายย่างความสุกระดับ Medium Rare เสิร์ฟพร้อมผักย่างและมันบด', 890.0, 'https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=800'),
(105, 'Margherita Pizza', 'พิซซ่าหน้าคลาสสิก แป้งบางกรอบ ซอสมะเขือเทศเข้มข้น มอสซาเรลล่าชีส และใบโหระพา', 350.0, 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca?auto=format&fit=crop&w=800'),
(106, 'Pad Thai Kung Sarong', 'ผัดไทยกุ้งแม่น้ำตัวโต เส้นเหนียวนุ่ม ผัดด้วยซอสมะขามเปียกรสเข้มข้น', 220.0, 'https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=800'),
(107, 'Chicken Green Curry', 'แกงเขียวหวานไก่กะทิสด รสชาติกลมกล่อม หอมกลิ่นเครื่องแกงไทยแท้', 185.0, 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?auto=format&fit=crop&w=800'),
(108, 'Classic Pancake Stack', 'แพนเค้กนุ่มฟู 3 ชั้น ราดด้วยน้ำเชื่อมเมเปิลและเนยสดแท้ เสิร์ฟพร้อมผลไม้ตระกูลเบอร์รี่', 240.0, 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=800'),
(109, 'Matcha Latte Art', 'มัทฉะพรีเมียมจากเมืองอูจิ ผสมนมสดแท้ 100% รสชาติเข้มข้นและหอมละมุน', 145.0, 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=800'),
(110, 'Mixed Berry Smoothie', 'สมูทตี้เบอร์รี่รวมแช่แข็ง ปั่นรวมกับโยเกิร์ตสด ให้ความสดชื่นและวิตามินสูง', 120.0, 'https://images.unsplash.com/photo-1553531384-cc64ac80f931?auto=format&fit=crop&w=800');